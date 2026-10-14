import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AiProvider } from './ai-provider.interface';

const REQUEST_TIMEOUT_MS = 30000;
const DEFAULT_MODEL = 'gemini-2.0-flash';

interface GeminiGenerateResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

@Injectable()
export class GeminiProvider implements AiProvider {
  constructor(private readonly configService: ConfigService) {}

  async generate(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const model =
      this.configService.get<string>('GEMINI_MODEL') ?? DEFAULT_MODEL;

    if (!apiKey) {
      throw new ServiceUnavailableException(
        'GEMINI_API_KEY가 설정되지 않았습니다.',
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
          signal: controller.signal,
        },
      );

      if (!res.ok) {
        throw new Error(`Gemini 응답 오류: ${res.status}`);
      }

      const data = (await res.json()) as GeminiGenerateResponse;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini 응답에 텍스트가 없습니다.');
      }
      return text;
    } catch {
      throw new ServiceUnavailableException(
        'AI 서버(Gemini)에 연결할 수 없습니다.',
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}
