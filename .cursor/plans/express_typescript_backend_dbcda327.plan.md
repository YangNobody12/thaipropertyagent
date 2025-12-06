---
name: Express TypeScript Backend
overview: Set up a Node.js Express backend with TypeScript in the /backend folder, with endpoints for ElevenLabs TTS and Smithery AI integrations.
todos:
  - id: init-backend
    content: Create package.json and tsconfig.json with Express + TypeScript deps
    status: pending
  - id: express-server
    content: Set up Express server entry point with middleware
    status: pending
  - id: elevenlabs-service
    content: Create ElevenLabs TTS service and route
    status: pending
  - id: smithery-service
    content: Create Smithery AI chat service and route
    status: pending
  - id: env-config
    content: Add .env.example and .gitignore
    status: pending
---

# Express TypeScript Backend Setup

## Overview

Create a Node.js + Express + TypeScript backend in [`backend/`](backend/) that serves as an API proxy for ElevenLabs TTS and Smithery AI. This keeps API keys secure on the server while Convex handles real-time data sync.

## Architecture

```
Frontend (Next.js) --> Backend (Express) --> ElevenLabs API (TTS)
                              |
                              +--> Smithery AI (Chat/Agent)
```

## Implementation

### 1. Initialize Node.js Project with TypeScript

Create project structure in `backend/`:

```
backend/
├── src/
│   ├── index.ts            # Express server entry
│   ├── routes/
│   │   ├── tts.ts          # ElevenLabs TTS endpoints
│   │   └── chat.ts         # Smithery AI endpoints
│   ├── services/
│   │   ├── elevenlabs.ts   # ElevenLabs API client
│   │   └── smithery.ts     # Smithery AI client
│   └── middleware/
│       └── cors.ts         # CORS configuration
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

### 2. Dependencies

- **express** - Web framework
- **cors** - Cross-origin support for frontend
- **dotenv** - Environment variables
- **axios** - HTTP client for API calls
- **typescript** + **ts-node-dev** - TypeScript support with hot reload

### 3. API Endpoints

| Endpoint | Method | Purpose |

|----------|--------|---------|

| `POST /api/tts` | POST | Generate speech from Thai text via ElevenLabs |

| `POST /api/chat` | POST | Send message to Smithery AI agent |

| `GET /api/health` | GET | Health check endpoint |

### 4. Environment Variables

```env
PORT=3001
ELEVENLABS_API_KEY=your_key
ELEVENLABS_VOICE_ID=thai_voice_id
SMITHERY_API_KEY=your_key
FRONTEND_URL=http://localhost:3000
```

### 5. Key Features

- TypeScript for type safety
- CORS configured for frontend at localhost:3000
- Error handling middleware
- Clean service layer abstraction for APIs
- Ready for your friend to extend

## Files to Create

1. `backend/package.json` - Dependencies and scripts
2. `backend/tsconfig.json` - TypeScript config
3. `backend/.env.example` - Environment template
4. `backend/.gitignore` - Ignore node_modules and .env
5. `backend/src/index.ts` - Express server setup
6. `backend/src/routes/tts.ts` - ElevenLabs route
7. `backend/src/routes/chat.ts` - Smithery AI route
8. `backend/src/services/elevenlabs.ts` - ElevenLabs service
9. `backend/src/services/smithery.ts` - Smithery service
10. `backend/src/middleware/cors.ts` - CORS config

## Run Commands

```bash
cd backend
npm install
npm run dev     # Development with hot reload
npm run build   # Build for production
npm start       # Run production build
```