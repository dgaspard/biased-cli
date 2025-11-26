<!--
AI AGENT METADATA:
@purpose: Define Retrieval-Augmented Generation (RAG) configuration and strategy. Specifies how knowledge is retrieved and used to augment AI responses.
@audience: Developers, AI agents, ML engineers
@format: Structured sections for RAG components (Indexes, Chunking, Re-ranking, Caching)
@required_sections: Indexes, Chunking strategy, Re-ranking (if used), Caching strategy
@related_files:
  - biased/architecture/architecture.md (overall tech design)
  - biased/behavior/behavior-spec.md (retrieval must support behaviors)
  - biased/configuration/app.properties.template (runtime RAG config)
@update_frequency: Update when RAG strategy changes or performance issues arise
@instructions: AI agents should use this configuration when implementing or modifying RAG retrieval logic. Test changes against eval sets to ensure behavior quality is maintained.
@components: Indexing, Chunking, Embedding, Retrieval, Re-ranking, Caching
@optimization: Monitor retrieval latency and relevance metrics
-->

# RAG Plan

## Indexes

[List data sources that will be indexed for retrieval.]

Example:
- `policies/*` - Insurance policy documents
- `knowledge/*` - Domain knowledge base

## Chunking Strategy

[How documents are split for embedding and retrieval.]

Example:
- **Chunk size**: 800 tokens
- **Overlap**: 10% (80 tokens)
- **Splitting**: Prefer sentence boundaries

## Embedding Model

[Which embedding model is used and why.]

Example:
- Model: `text-embedding-ada-002`
- Dimensions: 1536
- Rationale: Balance of quality and cost

## Retrieval

[How relevant chunks are selected.]

Example:
- **Top-K**: 20 chunks initially retrieved
- **Similarity metric**: Cosine similarity
- **Threshold**: Minimum 0.7 similarity score

## Re-ranking

[Optional: How initial results are refined.]

Example:
- **Method**: Cross-encoder on top 20 chunks
- **Model**: `cross-encoder/ms-marco-MiniLM-L-6-v2`
- **Final K**: 5 most relevant chunks after re-ranking

## Caching

[Optimization strategy to reduce latency and cost.]

Example:
- **Strategy**: Memoize retrieval per claim ID
- **TTL**: 24 hours
- **Cache backend**: Redis

---

**AI Agent Instructions:**
- Use these parameters when implementing RAG retrieval logic
- Test chunking strategy on sample documents to verify quality
- Monitor retrieval latency - adjust Top-K if response time exceeds SLA
- Evaluate re-ranking effectiveness on eval set
- Consider caching for frequently accessed documents
- Update this plan when retrieval metrics (accuracy, latency) don't meet targets

Last updated: {{DATE}}
