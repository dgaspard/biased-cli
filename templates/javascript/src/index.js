import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: '{{PROJECT_NAME}}' });
});

// Main endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to {{PROJECT_NAME}}',
        problem: '{{PROJECT_PROBLEM}}',
        personas: '{{USER_PERSONAS}}'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 {{PROJECT_NAME}} running on http://localhost:${PORT}`);
    console.log(`📋 Problem: {{PROJECT_PROBLEM}}`);
    console.log(`👥 Personas: {{USER_PERSONAS}}`);
});
