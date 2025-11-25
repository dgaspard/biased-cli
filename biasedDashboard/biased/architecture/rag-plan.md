# RAG Plan

**Indexes**
- `policies/*`
- `knowledge/*`

**Chunking**
- 800 tokens, 10% overlap

**Re-ranking**
- cross-encoder on top 20 chunks

**Caching**
- memoize retrieval per claim id
