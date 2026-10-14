import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';

export class CreateWeightDto {
  @ApiProperty({ example: 68.5, description: '몸무게 (kg)' })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({ example: '2026-08-29', description: '기록 날짜 (YYYY-MM-DD)' })
  @IsDateString()
  recordedAt: string;
}
