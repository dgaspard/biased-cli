# Configuration

This folder contains application configuration templates and environment-specific settings for your BIASED-enabled project.

## Purpose

The `configuration/` folder provides a structured location for:
- Application configuration templates
- Environment variable definitions
- Service endpoint configurations
- Feature flags and settings
- API keys and credentials (templates only, not actual values)

## Files

### `app.properties.template`

A language-agnostic configuration template covering common application settings. This template includes:

- **Application Settings** - Basic app metadata
- **Database Configuration** - Connection strings and pool settings
- **API Configuration** - External API endpoints and credentials
- **Authentication & Security** - JWT, session secrets, encryption keys
- **Service Endpoints** - Third-party integrations (email, payment, etc.)
- **Feature Flags** - Enable/disable features
- **Logging & Monitoring** - Log levels and monitoring service config
- **Performance Settings** - Caching and rate limiting
- **AI/ML Configuration** - AI model endpoints and parameters
- **Custom Settings** - Project-specific configuration

## How to Use

### 1. Choose Your Format

Copy `app.properties.template` and convert it to your project's configuration format:

**Node.js / JavaScript:**
```bash
cp app.properties.template ../.env
# or
cp app.properties.template ../config/default.json
```

**Java:**
```bash
cp app.properties.template ../src/main/resources/application.properties
```

**.NET:**
Convert to JSON format:
```bash
# Create appsettings.json from template
```

**Python:**
```bash
cp app.properties.template ../config.py
# or
cp app.properties.template ../.env
```

### 2. Fill in Values

Replace all placeholder values (shown in `<angle_brackets>`) with actual values for your environment:

```properties
# Template (DON'T commit)
DATABASE_HOST=<database_host_url>

# Actual (DO commit to .env.example, DON'T commit with real values)
DATABASE_HOST=localhost
```

### 3. Protect Sensitive Data

**IMPORTANT:** Never commit actual credentials or secrets to version control.

Add your actual configuration file to `.gitignore`:
```gitignore
.env
config/production.json
application.properties
appsettings.json
```

Instead, commit example files:
```bash
.env.example
config/default.example.json
```

### 4. Environment-Specific Configs

Create separate configuration files for each environment:

```
config/
├── development.json
├── staging.json
├── production.json
└── local.json  (gitignored)
```

## Best Practices

### Security
- ✅ Use environment variables for sensitive data
- ✅ Use a secrets manager in production (AWS Secrets Manager, Azure Key Vault, etc.)
- ✅ Rotate credentials regularly
- ❌ Never commit actual secrets to version control
- ❌ Don't log sensitive configuration values

### Documentation
- Document all configuration variables in this template
- Explain complex configurations in comments
- Provide example values when possible
- Link to external documentation for third-party services

### Validation
- Validate required configuration on application startup
- Provide clear error messages for missing config
- Use type-safe configuration objects when possible

### Organization
- Group related settings together
- Use consistent naming conventions
- Keep configuration flat and simple
- Avoid deep nesting

## Configuration by Language

### Node.js / JavaScript

**Using .env (recommended for simple configs):**
```bash
# Install dotenv
npm install dotenv

# Load in your app
require('dotenv').config();
const dbHost = process.env.DATABASE_HOST;
```

**Using JSON config files:**
```javascript
const config = require('./config/default.json');
const dbHost = config.database.host;
```

### Python

**Using environment variables:**
```python
import os
from dotenv import load_dotenv

load_dotenv()
db_host = os.getenv('DATABASE_HOST')
```

**Using a config module:**
```python
import config
db_host = config.DATABASE_HOST
```

### Java

**Using application.properties:**
```java
@Value("${database.host}")
private String databaseHost;
```

### .NET

**Using appsettings.json:**
```csharp
var dbHost = Configuration["Database:Host"];
```

## AI & BIASED Integration

This configuration template is designed to work seamlessly with AI agents and the BIASED framework:

- **Intent Alignment** - Configuration should reflect the intent defined in `biased/intent/intent.md`
- **Behavior Specification** - Feature flags align with `biased/behavior/behavior-spec.md`
- **Evaluation** - Configuration supports testing environments in `biased/eval/`
- **Governance** - Security settings align with `biased/governance/governance-card.md`

## Troubleshooting

### Configuration Not Loading
- Verify file path is correct
- Check file permissions
- Ensure proper format (YAML, JSON, etc.)
- Validate environment variable names

### Missing Values
- Check for typos in variable names
- Verify environment-specific config is loaded
- Ensure .env file is in the correct directory

### Security Concerns
- Audit configuration for exposed secrets
- Review access controls
- Enable encryption for sensitive data
- Use vault services for production

## Next Steps

1. Copy `app.properties.template` to your preferred format
2. Fill in your environment-specific values
3. Add actual config files to `.gitignore`
4. Test configuration loading in your application
5. Document any custom configuration sections
6. Set up secrets management for production

## Related BIASED Folders

- **`biased/architecture/`** - Document configuration architecture decisions
- **`biased/operations/`** - Deployment and environment setup procedures
- **`biased/governance/`** - Security policies for configuration management
- **`biased/docs/operations/`** - Detailed configuration documentation
