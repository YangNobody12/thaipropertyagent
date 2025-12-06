import axios from 'axios';

const SMITHERY_API_URL = process.env.SMITHERY_API_URL || 'https://api.smithery.ai/v1';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
  systemPrompt?: string;
}

export interface ChatResponse {
  message: string;
  conversationId?: string;
  metadata?: Record<string, unknown>;
}

// Default system prompt for Thai Property Agent
const DEFAULT_SYSTEM_PROMPT = `You are a helpful Thai real estate agent assistant. You help users find properties in Thailand, answer questions about the Thai property market, and provide information about different locations.

Key behaviors:
- Respond in the same language the user writes in (Thai or English)
- Be knowledgeable about Thai real estate markets (Bangkok, Chiang Mai, Phuket, etc.)
- Provide helpful information about property types, prices, and locations
- Be friendly and professional
- If you don't have specific property data, provide general helpful information

When discussing properties, mention:
- Location and neighborhood
- Price range in Thai Baht (THB)
- Property type (condo, house, villa)
- Key features and amenities`;

export class SmitheryService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SMITHERY_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️  SMITHERY_API_KEY not set - Chat will not work');
    }
  }

  /**
   * Send a message to Smithery AI and get a response
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const { message, conversationHistory = [], systemPrompt } = request;

    if (!this.apiKey) {
      throw new Error('Smithery API key not configured');
    }

    if (!message || message.trim().length === 0) {
      throw new Error('Message is required');
    }

    // Build messages array with system prompt and conversation history
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: systemPrompt || DEFAULT_SYSTEM_PROMPT,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    try {
      const response = await axios.post(
        `${SMITHERY_API_URL}/chat/completions`,
        {
          messages,
          model: 'default', // Smithery will use its configured model
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      const assistantMessage = response.data.choices?.[0]?.message?.content || '';

      return {
        message: assistantMessage,
        conversationId: response.data.id,
        metadata: {
          model: response.data.model,
          usage: response.data.usage,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || error.message;
        throw new Error(`Smithery API error: ${errorMessage}`);
      }
      throw error;
    }
  }

  /**
   * Check if Smithery service is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const smitheryService = new SmitheryService();

