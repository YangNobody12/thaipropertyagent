import { Router, Request, Response, NextFunction } from 'express';
import { elevenLabsService } from '../services/elevenlabs';

const router = Router();

interface TTSRequestBody {
  text: string;
  voiceId?: string;
  modelId?: string;
}

/**
 * POST /api/tts
 * Generate speech from text using ElevenLabs
 * 
 * Body: { text: string, voiceId?: string, modelId?: string }
 * Returns: audio/mpeg stream
 */
router.post('/', async (req: Request<object, unknown, TTSRequestBody>, res: Response, next: NextFunction) => {
  try {
    const { text, voiceId, modelId } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const result = await elevenLabsService.textToSpeech({
      text,
      voiceId,
      modelId,
    });

    res.set({
      'Content-Type': result.contentType,
      'Content-Length': result.audio.length.toString(),
      'Cache-Control': 'no-cache',
    });

    res.send(result.audio);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tts/voices
 * Get available voices from ElevenLabs
 */
router.get('/voices', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const voices = await elevenLabsService.getVoices();
    res.json({ voices });
  } catch (error) {
    next(error);
  }
});

export default router;

