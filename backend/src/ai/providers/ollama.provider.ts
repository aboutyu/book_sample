import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AiProvider } from './ai-provider.interface';

// Ollama가 모델을 처음 메모리에 올릴 때(cold start)는 CPU 환경에서 15초를 넘길 수 있어 넉넉하게 설정한다.
const REQUEST_TIMEOUT_MS = 60000;

interface OllamaGenerateResponse {
  response: string;
}

@Injectable()
export class OllamaProvider implements AiProvider {
  constructor(private readonly configService: ConfigService) {}

  async generate(prompt: string): Promise<string> {
    const baseUrl = this.configService.get<string>('OLLAMA_BASE_URL');
    const model = this.configService.get<string>('OLLAMA_MODEL');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, stream: false }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Ollama 응답 오류: ${res.status}`);
      }

      const data = (await res.json()) as OllamaGenerateResponse;
      return data.response;
    } catch {
      throw new ServiceUnavailableException(
        'AI 서버(Ollama)에 연결할 수 없습니다.',
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}
