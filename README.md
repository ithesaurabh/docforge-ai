# 🚀 DocForge AI

> **AI-powered Document Intelligence Backend** built with **TypeScript**, **Express**, **LangChain**, **PostgreSQL (pgvector)**, and **Ollama**.

DocForge AI is a backend-first, source-available project that explores modern AI application architecture through **Retrieval-Augmented Generation (RAG)**. It enables semantic document search and context-aware question answering using locally hosted Large Language Models.

---

## ✨ Overview

DocForge AI demonstrates how modern AI systems combine traditional backend engineering with semantic retrieval and local LLMs.

The project focuses on building a production-inspired RAG pipeline while keeping every major component modular and replaceable.

Core workflow:

```
Upload Document
        ↓
Extract Text
        ↓
Chunk Document
        ↓
Generate Embeddings
        ↓
Store Vectors
        ↓
Semantic Retrieval
        ↓
Prompt Construction
        ↓
Local LLM (Ollama)
        ↓
Grounded AI Response
```

---

# 🚀 Planned Features

### Authentication

- PASETO Authentication
- User Management
- Protected APIs

### Document Management

- Upload PDF
- Upload DOCX
- Upload TXT
- Upload Markdown
- Document metadata
- Delete documents
- Re-index documents

### AI Processing

- Text extraction
- Recursive chunking
- Embedding generation
- Semantic search
- Context retrieval
- Source citations
- Configurable retrieval strategies

### Conversations

- Multi-turn conversations
- Context-aware responses
- Conversation history

### Background Processing

- Queue-based indexing
- Automatic embedding generation
- Background workers

### Infrastructure

- Docker-first development
- Structured logging
- Validation
- Centralized error handling
- Modular architecture

---

# 🛠 Tech Stack

| Category | Technology |
| --- | --- |
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Vector Store | pgvector |
| AI Framework | LangChain |
| Local LLM | Ollama |
| Queue | BullMQ |
| Cache | Redis |
| Validation | Zod |
| Authentication | PASETO |
| Logging | Pino |
| Containerization | Docker |

---

# 📁 Planned Project Structure

```
src
│
├── config
├── middleware
├── shared
├── workers
│
├── modules
│   ├── auth
│   ├── users
│   ├── documents
│   ├── conversations
│   └── ai
│       ├── parser
│       ├── chunking
│       ├── embeddings
│       ├── retrieval
│       ├── prompts
│       ├── llm
│       └── vector-store
│
└── server.ts
```

---

# 📚 Learning Objectives

This project is built to gain practical experience with:

- Retrieval-Augmented Generation (RAG)
- LangChain
- Local LLM deployment
- Ollama
- Vector embeddings
- PostgreSQL + pgvector
- Semantic search
- Prompt engineering
- AI backend architecture
- Scalable API development

---

# 📅 Roadmap

### Version 1

- Authentication
- Document upload
- Text extraction
- Chunking
- Embedding generation
- Vector storage
- Semantic search
- AI-powered Q&A
- Source citations

### Version 2

- Conversation memory
- Streaming responses
- OCR support
- Document collections
- Hybrid search
- AI summaries

### Version 3

- LangGraph workflows
- AI agents
- Tool calling
- Multi-modal RAG
- Knowledge Graph integration

---

# 🤝 Contributing

Contributions are welcome!

Please open an issue before making major changes.

By submitting a pull request, you agree that your contribution may be distributed under this repository's license.

---

# 📄 License

This repository is released under the **DocForge AI Source Available License**.

- ✅ Personal use
- ✅ Educational use
- ✅ Research
- ✅ Modification
- ✅ Contributions

Commercial use requires prior written permission from the copyright holder.

See the **LICENSE** file for details.

---

# 👨‍💻 Author

**Saurabh Kumar Jha**

Backend Developer | AI Engineering Enthusiast

📧 [saurabh.jha.connect@gmail.com](mailto:saurabh.jha.connect@gmail.com)