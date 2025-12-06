// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import { corsMiddleware } from './middleware/cors';
import ttsRoutes from './routes/tts';
import chatRoutes from './routes/chat';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'thai-property-agent-backend',
  });
});

// API Routes
app.use('/api/tts', ttsRoutes);
app.use('/api/chat', chatRoutes);

// Error handling middleware
interface ApiError extends Error {
  statusCode?: number;
}

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    statusCode,
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    statusCode: 404,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Thai Property Agent Backend running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎙️  TTS endpoint: http://localhost:${PORT}/api/tts`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
});

export default app;

