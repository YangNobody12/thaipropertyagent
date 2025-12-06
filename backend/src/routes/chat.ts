import { Router, Request, Response, NextFunction } from 'express';
import { smitheryService, ChatMessage } from '../services/smithery';

const router = Router();

interface ChatRequestBody {
  message: string;
  conversationHistory?: ChatMessage[];
  systemPrompt?: string;
}

/**
 * POST /api/chat
 * Send a message to Smithery AI agent
 * 
 * Body: { 
 *   message: string, 
 *   conversationHistory?: ChatMessage[], 
 *   systemPrompt?: string 
 * }
 * Returns: { message: string, conversationId?: string, metadata?: object }
 */
router.post('/', async (req: Request<object, unknown, ChatRequestBody>, res: Response, next: NextFunction) => {
  try {
    const { message, conversationHistory, systemPrompt } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const result = await smitheryService.chat({
      message,
      conversationHistory,
      systemPrompt,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/chat/status
 * Check if chat service is configured
 */
router.get('/status', (_req: Request, res: Response) => {
  res.json({
    configured: smitheryService.isConfigured(),
    service: 'smithery',
  });
});

export default router;

