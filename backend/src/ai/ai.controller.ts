import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from './ai.service';
import { EstimateCaloriesDto } from './dto/estimate-calories.dto';
import { ChatDto } from './dto/chat.dto';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('estimate-calories')
  @ApiOperation({ summary: 'AI 기반 음식 칼로리 추정 (추정값입니다)' })
  estimateCalories(@Body() dto: EstimateCaloriesDto) {
    return this.aiService.estimateCalories(dto.foodName);
  }

  @Post('chat')
  @ApiOperation({ summary: 'LLM과 간단한 대화' })
  async chat(@Body() dto: ChatDto) {
    const reply = await this.aiService.chat(dto.message);
    return { reply };
  }
}
