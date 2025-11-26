<!--
AI AGENT METADATA:
@purpose: Define formulas, data sources, and feasibility for all BIASED metrics. Technical reference for metric calculation.
@audience: Data engineers, AI agents, analysts, developers
@format: Organized by 5 metric categories, each with formulas and manual feasibility ratings
@required_sections: 5 metric categories (Behavioral Performance, Data Quality & Drift, System Reliability & Cost, Human-AI Interaction & Adoption, Team Effectiveness & Flow)
@related_files: ["biased/metrics/README.md", "biased/metrics/metrics-hook.json", "biased/intent/intent.md", "biased/eval/eval-config.json"]
@update_frequency: Update when adding new metrics or changing calculation methods
@instructions: AI agents should use these formulas when implementing metric collection. Prioritize ✓ (manual feasible) metrics first. Use definitions to understand data requirements.
@feasibility: ✓ = Manually feasible, ⚠️ = Requires some automation, ✖️ = Requires full automation
-->

# BIASED Metrics Definitions

## 1. Behavioral Performance
### “Is the system behaving as intended?”

### 1.1 Behavior Accuracy
- **Formula**: `(# Passed Behavior Tests) / (Total Behavior Tests)`
- **Data Sources**: Evaluation sets, BDD tests, logs
- **Manual Feasibility**: ✓

### 1.2 Consistency Score
- **Formula**: `1 − Variance(outputs for equivalent inputs)`
- **Data Sources**: Log sampling
- **Manual Feasibility**: ⚠️

### 1.3 Hallucination / Error Rate
- **Formula**: `(# Incorrect or Fabricated Outputs) / (Total Outputs)`
- **Data Sources**: Human review logs
- **Manual Feasibility**: ✓

---

## 2. Data Quality & Drift
### “Is the data supporting the behavior?”

### 2.1 Data Freshness
- **Formula**: `Current Date − Last Update Timestamp`
- **Data Sources**: Metadata, retrieval indexes
- **Manual Feasibility**: ✓

### 2.2 Retrieval Coverage
- **Formula**: `(# Test Cases w/ Evidence) / (Total Test Cases)`
- **Manual Feasibility**: ⚠️

### 2.3 Embedding / Behavior Drift Score
- **Semantic Drift**: `cosine_distance(Embeddings_T1, Embeddings_T2)`
- **Behavior Drift**: `(# Changed Outputs) / (Test Set Size)`
- **Manual Feasibility**: Semantic: ✖️, Behavior: ✓

---

## 3. System Reliability & Cost
### “Is the system stable and affordable?”

### 3.1 Latency
- **Formula**: `sum(Response Times) / n`
- **Manual Feasibility**: ✓

### 3.2 Tool Success Rate
- **Formula**: `(# Successful Tool Calls) / (Total Tool Calls)`
- **Manual Feasibility**: ✓

### 3.3 Cost per Request
- **Formula**: `(Model Cost + Infra Cost) / (# Requests)`
- **Manual Feasibility**: ⚠️

---

## 4. Human–AI Interaction & Adoption
### “Are humans benefiting from and trusting the system?”

### 4.1 Adoption Rate
- **Formula**: `(# Active Users) / (Eligible Users)`
- **Manual Feasibility**: ✓

### 4.2 Override / Correction Rate
- **Formula**: `(# Human Corrections) / (# AI Outputs)`
- **Manual Feasibility**: ✓

### 4.3 User Trust Score
- **Formula**: `Avg Survey Score`
- **Manual Feasibility**: ✓

### 4.4 Time Saved per Workflow
- **Formula**: `Old Workflow Time − New Workflow Time`
- **Manual Feasibility**: ✓

---

## 5. Team Effectiveness & Flow
### “How well is the team engineering and improving behavior?”

### 5.1 Cycle Time for Behavior Changes
- **Formula**: `Release Timestamp − Intent Commit Timestamp`
- **Manual Feasibility**: ✓

### 5.2 Evaluation Pass Rate
- **Formula**: `(# Passing Behavior Tests) / (Total Tests)`
- **Manual Feasibility**: ✓

### 5.3 Drift Detection Time
- **Formula**: `Drift Detection Timestamp − Drift Start Timestamp`
- **Manual Feasibility**: ⚠️

**AI Agent Instructions:**
- Start with✓ metrics (manually feasible) for quick wins
- Implement ⚠️ metrics incrementally as automation improves
- ✖️ metrics require significant tooling investment
- Ensure all formulas align with intent.md success metrics
- Update data sources when architecture changes
