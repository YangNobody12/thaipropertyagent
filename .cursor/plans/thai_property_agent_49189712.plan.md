---
name: Thai Property Agent
overview: Build a Thai real estate AI agent with voice capabilities using Next.js frontend, Convex backend, Smithery AI for intelligent responses, and ElevenLabs for Thai text-to-speech.
todos:
  - id: setup-nextjs
    content: Initialize Next.js 14 project with TypeScript, Tailwind CSS, and Convex
    status: in_progress
  - id: convex-schema
    content: Create Convex schema for properties, conversations, and chat logs
    status: pending
    dependencies:
      - setup-nextjs
  - id: seed-properties
    content: Seed Convex with mock Thai property data (10-15 properties)
    status: pending
    dependencies:
      - convex-schema
  - id: smithery-integration
    content: Set up Smithery AI integration with MCP for property Q&A
    status: pending
    dependencies:
      - convex-schema
  - id: chat-ui
    content: Build main chat interface with real-time message display
    status: pending
    dependencies:
      - convex-schema
  - id: elevenlabs-tts
    content: Integrate ElevenLabs API for Thai text-to-speech responses
    status: pending
    dependencies:
      - smithery-integration
  - id: voice-input
    content: Add Web Speech API for Thai voice input recognition
    status: pending
    dependencies:
      - chat-ui
  - id: polish-ui
    content: Polish UI with Thai-inspired theme and property cards
    status: pending
    dependencies:
      - chat-ui
      - elevenlabs-tts
---

# Thai Property Agent - Hackathon MVP

## Architecture Overview

```
User (speaks/types) --> Next.js Frontend --> Convex Backend --> Smithery AI (Agent + MCP)
         ^                                        |                      |
         |                                        v                      v
         +<-- ElevenLabs TTS <----- Response <----+<--- AI Response -----+
```

## Tech Stack

| Layer | Technology | Purpose |

|-------|------------|---------|

| Frontend | Next.js 14 (App Router) | Chat UI with voice controls |

| Backend | Convex | Real-time data, chat logs, property data |

| AI Agent | Smithery AI + MCP | Thai property Q&A intelligence |

| Voice | ElevenLabs API | Thai text-to-speech output |

| Voice Input | Web Speech API | Browser-native speech recognition |

## Implementation Plan

### Phase 1: Project Setup

1. Initialize Next.js project in `frontend/` with TypeScript and Tailwind CSS
2. Initialize Convex in the project (runs `npx convex dev`)
3. Set up environment variables structure for API keys:

   - `CONVEX_DEPLOYMENT`
   - `ELEVENLABS_API_KEY`
   - `SMITHERY_API_KEY`

### Phase 2: Convex Backend Schema

Create these tables in Convex:

```typescript
// convex/schema.ts
- properties: { name, location, price, type, bedrooms, bathrooms, description_th, description_en, imageUrl }
- conversations: { sessionId, messages[], createdAt }
- chatLogs: { conversationId, role, content, audioUrl?, timestamp }
```

Convex functions to build:

- `mutations/sendMessage.ts` - Save user message, call Smithery AI, save response
- `queries/getProperties.ts` - Fetch and filter properties
- `queries/getConversation.ts` - Get chat history
- `actions/generateSpeech.ts` - Call ElevenLabs API for TTS

### Phase 3: Smithery AI Integration

Create an MCP server configuration for property context:

- Configure Smithery to have access to property data schema
- Set up system prompt for Thai real estate agent persona
- Enable Thai language responses

The agent will be able to:

- Answer questions about available properties
- Provide Thai real estate market insights
- Respond in Thai when user speaks Thai

### Phase 4: Frontend Chat Interface

Build in `frontend/`:

1. **Main Chat Component** (`app/page.tsx`)

   - Chat message list with real-time updates via Convex
   - Input field with send button
   - Voice input toggle button (microphone)
   - Voice output toggle button (speaker)

2. **Voice Features**

   - `hooks/useSpeechRecognition.ts` - Web Speech API for Thai speech input
   - `hooks/useElevenLabs.ts` - Play TTS audio responses
   - Auto-play voice responses when enabled

3. **UI Design** (Thai-inspired aesthetic)

   - Gold and deep blue color scheme (Thai royal colors)
   - Clean, modern chat bubbles
   - Property cards with images when agent mentions properties

### Phase 5: Mock Property Data

Seed Convex with 10-15 realistic Thai properties:

- Bangkok condos (Sukhumvit, Silom, Sathorn)
- Chiang Mai houses and condos
- Phuket villas
- Price range: 2M - 50M THB

## Key Files Structure

```
thaipropertyagent/
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Main chat interface
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── globals.css        # Tailwind + Thai theme
│   ├── components/
│   │   ├── Chat.tsx           # Chat container
│   │   ├── MessageBubble.tsx  # Individual messages
│   │   ├── VoiceControls.tsx  # Mic/speaker toggles
│   │   └── PropertyCard.tsx   # Property display
│   ├── hooks/
│   │   ├── useSpeechRecognition.ts
│   │   └── useElevenLabs.ts
│   └── convex/
│       ├── schema.ts
│       ├── properties.ts
│       ├── conversations.ts
│       └── actions/
│           ├── chat.ts        # Smithery AI integration
│           └── speech.ts      # ElevenLabs integration
├── package.json
└── .env.local
```

## API Keys Needed

1. **Convex** - Free tier at [convex.dev](https://convex.dev)
2. **ElevenLabs** - Get key at [elevenlabs.io](https://elevenlabs.io) (free tier has 10k chars/month)
3. **Smithery AI** - Get key at [smithery.ai](https://smithery.ai)

## Demo Flow for Judges

1. User opens the app, sees welcome message in Thai
2. User types or speaks: "มีคอนโดในกรุงเทพไหม?" (Do you have condos in Bangkok?)
3. Agent responds with voice: Lists Bangkok condos with details
4. User asks follow-up: "อันไหนใกล้ BTS?" (Which one is near BTS?)
5. Agent intelligently filters and responds

This showcases: Real-time Convex sync, Smithery AI intelligence, ElevenLabs Thai voice, and smooth UX.