import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Analyze text using OpenAI and return summary & key insights
   * @param text string - input text to analyze
   */
  async analyzeText(text: string): Promise<string> {
    // 1️⃣ Basic validation
    if (!text || text.trim().length === 0) {
      throw new BadRequestException('Text cannot be empty');
    }

    // Optional: limit text length (e.g., 10,000 chars)
    const MAX_LENGTH = 10000;
    if (text.length > MAX_LENGTH) {
      throw new BadRequestException(
        `Text exceeds maximum length of ${MAX_LENGTH} characters`,
      );
    }

    const prompt = `Analyze the following text and provide a summary with key insights:\n\n${text}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      return response.choices?.[0]?.message?.content ?? '';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new InternalServerErrorException(
        'Failed to analyze text with OpenAI',
      );
    }
  }
}
