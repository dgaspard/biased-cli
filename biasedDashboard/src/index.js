import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'biasedDashboard' });
});

// Main endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to biasedDashboard',
        problem: 'Should dashboard metrics for users of BIASED',
        personas: 'organizationAdmin, ProjectAdmin, projectUser, basicUser	'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 biasedDashboard running on http://localhost:${PORT}`);
    console.log(`📋 Problem: Should dashboard metrics for users of BIASED`);
    console.log(`👥 Personas: organizationAdmin, ProjectAdmin, projectUser, basicUser	`);
});
