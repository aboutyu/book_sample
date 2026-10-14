import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserPayload } from '../auth/current-user.decorator';
import { WeightsService } from './weights.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';

@ApiTags('weights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('weights')
export class WeightsController {
  constructor(private readonly weightsService: WeightsService) {}

  @Get()
  @ApiOperation({ summary: '내 몸무게 기록 목록 조회' })
  findAll(@CurrentUser() user: CurrentUserPayload) {
    return this.weightsService.findAllByUser(user.id);
  }

  @Post()
  @ApiOperation({ summary: '몸무게 기록 등록' })
  create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreateWeightDto,
  ) {
    return this.weightsService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '몸무게 기록 수정 (본인 소유만 가능)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateWeightDto,
  ) {
    return this.weightsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '몸무게 기록 삭제 (본인 소유만 가능)' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.weightsService.remove(id, user.id);
  }
}
