import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OllamaProvider } from './providers/ollama.provider';
import { GeminiProvider } from './providers/gemini.provider';
import type { AiProvider } from './providers/ai-provider.interface';
import type { EstimateCaloriesResult } from './estimate-calories-result';

function extractJsonObject(text: string): string {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) {
    throw new Error('JSON 형식을 찾을 수 없습니다.');
  }
  return text.slice(start, end + 1);
}

@Injectable()
export class AiService {
  private readonly provider: AiProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly ollamaProvider: OllamaProvider,
    private readonly geminiProvider: GeminiProvider,
  ) {
    const providerName = this.configService.get<string>('AI_PROVIDER');
    this.provider =
      providerName === 'gemini' ? this.geminiProvider : this.ollamaProvider;
  }

  async estimateCalories(foodName: string): Promise<EstimateCaloriesResult> {
    const prompt = `당신은 음식 칼로리를 추정하는 도우미입니다.
다음 음식의 예상 칼로리를 JSON 형식으로만 응답하세요. 다른 설명 문장은 출력하지 마세요.

음식: ${foodName}

응답 형식 (JSON만 출력):
{"foodName": "음식 이름", "estimatedCalories": 350, "unit": "kcal", "note": "양과 조리법에 따라 달라질 수 있는 추정값입니다."}`;

    const raw = await this.provider.generate(prompt);
    return this.parseCalorieResponse(raw, foodName);
  }

  private parseCalorieResponse(
    raw: string,
    fallbackName: string,
  ): EstimateCaloriesResult {
    try {
      const jsonText = extractJsonObject(raw);
      const parsed = JSON.parse(jsonText) as Record<string, unknown>;
      const estimatedCalories = Number(parsed.estimatedCalories);

      if (!Number.isFinite(estimatedCalories) || estimatedCalories < 0) {
        throw new Error('유효하지 않은 칼로리 값입니다.');
      }

      return {
        foodName:
          typeof parsed.foodName === 'string' ? parsed.foodName : fallbackName,
        estimatedCalories,
        unit: typeof parsed.unit === 'string' ? parsed.unit : 'kcal',
        note:
          typeof parsed.note === 'string'
            ? parsed.note
            : '양과 조리법에 따라 달라질 수 있는 추정값입니다.',
      };
    } catch {
      throw new BadGatewayException(
        'AI 응답을 해석할 수 없습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  }

  async chat(message: string): Promise<string> {
    return this.provider.generate(message);
  }
}
