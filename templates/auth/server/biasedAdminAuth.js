const express = require('express');
const session = require('express-session');
const { Issuer, Strategy } = require('openid-client');
const fs = require('fs');
const path = require('path');

// --- Configuration Loading ---
const CFG_PATH = path.join(process.cwd(), 'biasedAdmin', 'portal.auth.json');
let portalConfig = { accessMode: 'domainAllowlist', allowedDomains: [], allowedEmails: [] };

try {
    if (fs.existsSync(CFG_PATH)) {
        portalConfig = JSON.parse(fs.readFileSync(CFG_PATH, 'utf8'));
    } else {
        console.warn('⚠️  biasedAdmin/portal.auth.json not found. Defaulting to deny-all.');
    }
} catch (e) {
    console.error('❌ Failed to load portal.auth.json:', e.message);
}

// --- Auth Utilities ---
function isAuthorized(userinfo) {
    const email = userinfo.email;
    if (!email) return false;

    const domain = email.split('@')[1];

    switch (portalConfig.accessMode) {
        case 'idpAssignedOnly':
            // Assumes the IdP ONLY allows assigned users to authenticate.
            // CAUTION: verified_email check is recommended if provider supports it.
            return true;
        case 'emailAllowlist':
            return portalConfig.allowedEmails.includes(email);
        case 'domainAllowlist':
        default:
            return portalConfig.allowedDomains.includes(domain);
    }
}

/**
 * Mounts BIASED Admin Auth routes and middleware.
 * @param {express.Application} app - The Express app instance
 */
async function setupBiasedAuth(app) {
    const {
        OIDC_ISSUER_URL,
        OIDC_CLIENT_ID,
        OIDC_CLIENT_SECRET,
        OIDC_REDIRECT_URI,
        SESSION_SECRET = 'change_me_in_production_biased_secret',
        OIDC_SCOPES = 'openid profile email'
    } = process.env;

    if (!OIDC_ISSUER_URL || !OIDC_CLIENT_ID || !OIDC_CLIENT_SECRET || !OIDC_REDIRECT_URI) {
        console.error('❌ Missing required OIDC environment variables. BIASED Admin Auth disabled.');
        return;
    }

    // 1. Session Setup (Secure constraints for prod)
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }));

    // 2. OpenID Client Setup
    const issuer = await Issuer.discover(OIDC_ISSUER_URL);
    const client = new issuer.Client({
        client_id: OIDC_CLIENT_ID,
        client_secret: OIDC_CLIENT_SECRET,
        redirect_uris: [OIDC_REDIRECT_URI],
        response_types: ['code']
    });

    // 3. Routes
    // Login
    app.get('/biasedAdmin/login', (req, res) => {
        const authUrl = client.authorizationUrl({
            scope: OIDC_SCOPES,
        });
        res.redirect(authUrl);
    });

    // Callback
    app.get('/biasedAdmin/callback', async (req, res) => {
        try {
            const params = client.callbackParams(req);
            const tokenSet = await client.callback(OIDC_REDIRECT_URI, params);
            const userinfo = await client.userinfo(tokenSet.access_token);

            req.session.biasedUser = {
                isAuthenticated: true,
                ...userinfo
            };

            res.redirect('/biasedAdmin');
        } catch (err) {
            console.error('Auth Callback Failed:', err);
            res.status(500).send('Authentication failed');
        }
    });

    // Logout
    app.post('/biasedAdmin/logout', (req, res) => {
        req.session.destroy();
        // Optional: Redirect to IdP logout if supported
        res.redirect('/');
    });

    // API: Me (BFF endpoint)
    app.get('/biasedAdmin/api/me', (req, res) => {
        const user = req.session.biasedUser;

        if (!user || !user.isAuthenticated) {
            return res.json({ isAuthenticated: false });
        }

        const authorized = isAuthorized(user);

        res.json({
            isAuthenticated: true,
            isAdmin: authorized,
            user: {
                name: user.name,
                email: user.email,
                picture: user.picture
            },
            accessMode: portalConfig.accessMode
        });
    });

    // 4. Middleware for protecting /biasedAdmin routes
    // Only strictly blocks sub-api routes. The main page serves UI which handles 401/403 states gracefully.
    app.use('/biasedAdmin/api/protected', (req, res, next) => {
        if (!req.session.biasedUser) {
            return res.status(401).json({ error: 'Unauthenticated' });
        }
        if (!isAuthorized(req.session.biasedUser)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    });
}

module.exports = setupBiasedAuth;
