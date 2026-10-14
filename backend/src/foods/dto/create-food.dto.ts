import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateFoodDto {
  @ApiProperty({ example: '김치찌개' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 350, description: '칼로리 (kcal)' })
  @IsInt()
  @Min(0)
  calories: number;

  @ApiProperty({ example: '2026-08-29', description: '섭취 날짜 (YYYY-MM-DD)' })
  @IsDateString()
  eatenAt: string;
}
