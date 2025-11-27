<!--
AI AGENT METADATA:
@purpose: Define the technical infrastructure, configuration, and deployment strategy for the project.
@audience: DevOps engineers, Cloud Architects, AI Agents generating infrastructure code (Terraform/Pulumi).
@instructions: 
  1. ANALYZE the project's technology stack (e.g., Next.js, Python/FastAPI, Java/Spring).
  2. DETERMINE the appropriate cloud provider (GCP, AWS, Azure) based on user preference or defaults.
  3. FILL OUT this template with specific resource definitions, machine types, and scaling constraints.
  4. REPLACE all {{PLACEHOLDERS}} with actual values or recommended defaults.
  5. ADHERE to BIASED framework principles: Cost-efficiency (scale-to-zero), Security (private networking), and Reliability.
-->

# ⚙️ Platform Configuration Blueprint: {{CLOUD_PROVIDER}} & {{IAC_TOOL}}

This document provides the specific technical configuration and deployment steps for the **{{ENVIRONMENT_NAME}}** environment of **{{PROJECT_NAME}}**.

## 1. Environment Details

| Setting | Value | Notes |
| :--- | :--- | :--- |
| **Environment Name** | **{{ENVIRONMENT_NAME}}** | e.g., production, staging, dev. |
| **Cloud Project ID** | `{{PROJECT_ID}}` | Unique identifier for the cloud project. |
| **Region** | `{{REGION}}` | Primary deployment region (e.g., us-central1, us-east-1). |
| **IaC Workspace** | `{{WORKSPACE_NAME}}` | Matches the environment name for state management. |

---

## 2. Infrastructure as Code ({{IAC_TOOL}} Setup)

### A. Providers & Backend
* **Providers:** List required providers (e.g., `google`, `aws`, `random`).
* **Backend:** Define remote state storage (e.g., GCS bucket, S3 bucket, Terraform Cloud).

### B. Core Resources
1.  **Networking:** VPCs, Subnets, Firewalls, Connectors.
2.  **Compute:** Serverless services (Cloud Run, Lambda), VM instances.
3.  **Database:** Managed database instances (Cloud SQL, RDS).
4.  **Security:** Secret Managers, IAM Roles, Service Accounts.
5.  **Storage:** Object storage buckets.

---

## 3. Service Configurations

### A. Frontend Service ({{FRONTEND_FRAMEWORK}})
| Setting | Value | Constraint / Source |
| :--- | :--- | :--- |
| **Container Image** | `{{IMAGE_PATH}}` | Registry location. |
| **Compute Resources** | {{CPU}} CPU / {{MEMORY}} RAM | Baseline for performance vs cost. |
| **Scaling (Min/Max)** | **`Min: {{MIN_INSTANCES}}`** / `Max: {{MAX_INSTANCES}}` | **Constraint:** Scale-to-zero recommended for low cost. |
| **Networking** | {{NETWORKING_CONFIG}} | e.g., Public ingress, VPC connector. |

### B. Backend/API Service ({{BACKEND_FRAMEWORK}})
| Setting | Value | Constraint / Source |
| :--- | :--- | :--- |
| **Container Image** | `{{IMAGE_PATH}}` | Registry location. |
| **Compute Resources** | {{CPU}} CPU / {{MEMORY}} RAM | Adjust based on workload. |
| **Scaling (Min/Max)** | **`Min: {{MIN_INSTANCES}}`** / `Max: {{MAX_INSTANCES}}` | **Constraint:** Scale-to-zero recommended. |
| **Networking** | {{NETWORKING_CONFIG}} | **Constraint:** Private access to DB recommended. |

---

## 4. Data Service Configurations ({{DATABASE_TYPE}})

### A. Database Instance
| Setting | Value | Constraint / Source |
| :--- | :--- | :--- |
| **Instance Tier** | **`{{DB_TIER}}`** | **Constraint:** Smallest tier for dev/startup (e.g., db-g1-small, t3.micro). |
| **Storage Capacity** | {{STORAGE_SIZE}} | Minimum viable size. |
| **Networking** | **{{NETWORKING_MODE}}** | **Constraint:** Private IP only recommended for security. |
| **Database Name** | `{{DB_NAME}}` | Dedicated database name. |
| **Credentials** | Stored in **{{SECRET_MANAGER}}** | **Constraint:** No hardcoded secrets. |

---

## 5. Deployment Pipeline ({{CI_CD_TOOL}})

### A. Core CI/CD Steps
1.  **Lint/Test:** Run unit and integration tests.
2.  **Build Images:** Build container images or artifacts.
3.  **Push Artifacts:** Push to container registry or artifact store.
4.  **Deploy:** Update infrastructure and deploy new application versions.

### B. Trigger Details
| Trigger | Configuration | Branch |
| :--- | :--- | :--- |
| **Main CI/CD Trigger** | Automated on `git push` | `main` branch (for production) |
| **Drift Check** | Scheduled check | Compares deployed state to IaC code. |
