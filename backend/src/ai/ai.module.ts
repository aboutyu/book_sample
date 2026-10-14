import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { OllamaProvider } from './providers/ollama.provider';
import { GeminiProvider } from './providers/gemini.provider';

@Module({
  controllers: [AiController],
  providers: [AiService, OllamaProvider, GeminiProvider],
})
export class AiModule {}
