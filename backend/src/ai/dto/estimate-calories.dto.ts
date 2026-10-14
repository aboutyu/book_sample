import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class EstimateCaloriesDto {
  @ApiProperty({ example: '김치찌개 1인분' })
  @IsString()
  @MinLength(1)
  foodName: string;
}
