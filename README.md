# eva.ai

A real-time AI agent platform built with LiveKit, featuring voice-enabled conversational agents, web interface, and API backend.

## Overview

eva.ai is a comprehensive platform for building and deploying AI-powered conversational agents with real-time voice capabilities. The platform consists of three main components:

- **Agent**: Python-based LiveKit agent with voice processing and AI integration
- **API**: TypeScript/Express backend for managing connections and tokens
- **Web**: React frontend for user interaction and agent management

## Features

- Real-time voice conversations with AI agents
- LiveKit integration for high-quality audio/video streaming
- Noise cancellation and speech processing
- Web-based agent management interface
- RESTful API for agent operations
- MongoDB for data persistence
- Modern React UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Agent**: Python 3.11+, LiveKit Agents, Deepgram, Google Cloud
- **Build Tools**: Turborepo, pnpm, ESLint, Prettier

## Project Structure

```
eva.ai/
├── apps/
│   ├── agent/          # Python LiveKit agent
│   ├── api/            # TypeScript/Express API server
│   └── web/            # React web application
├── packages/
│   ├── config/         # Shared ESLint/Prettier configs
│   └── types/          # Shared TypeScript types
├── package.json        # Root package.json with scripts
├── pnpm-workspace.yaml # pnpm workspace configuration
└── turbo.json          # Turborepo configuration
```

## Installation

### Prerequisites

- Node.js 18+
- Python 3.11+
- pnpm
- MongoDB

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/shubham6822/eva.ai.git
   cd eva.ai
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the Python agent environment:

   ```bash
   cd apps/agent
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -e .
   ```

4. Configure environment variables:
   - Copy `.env.example` files in each app directory
   - Fill in your LiveKit API keys, MongoDB connection, etc.

## Usage

### Development

Start all services in development mode:

```bash
pnpm dev
```

This will start:

- Web app on http://localhost:5173
- API server on http://localhost:3000
- Agent (requires LiveKit server)

### Building

Build all applications:

```bash
pnpm build
```

### Individual Services

Start individual services:

```bash
# Web app
cd apps/web && pnpm dev

# API server
cd apps/api && pnpm dev

# Agent (requires LiveKit server)
cd apps/agent && python main.py
```

## Configuration

### Environment Variables

Create `.env` files in each app directory:

**apps/api/.env:**

```
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
MONGODB_URI=mongodb://localhost:27017/eva
PORT=3000
```

**apps/agent/.env:**

```
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
DEEPGRAM_API_KEY=your_deepgram_key
GOOGLE_CREDENTIALS_PATH=path/to/credentials.json
```

**apps/web/.env:**

```
VITE_LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
```

## API Endpoints

- `POST /token` - Generate LiveKit access tokens
- `GET /agents` - List available agents
- `POST /agents` - Create new agent

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and run tests
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Submit a pull request

## License

ISC License
