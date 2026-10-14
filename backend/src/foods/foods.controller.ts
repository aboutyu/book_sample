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
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@ApiTags('foods')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  @ApiOperation({ summary: '내 음식 기록 목록 조회' })
  findAll(@CurrentUser() user: CurrentUserPayload) {
    return this.foodsService.findAllByUser(user.id);
  }

  @Post()
  @ApiOperation({ summary: '음식 기록 등록' })
  create(@CurrentUser() user: CurrentUserPayload, @Body() dto: CreateFoodDto) {
    return this.foodsService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '음식 기록 수정 (본인 소유만 가능)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateFoodDto,
  ) {
    return this.foodsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '음식 기록 삭제 (본인 소유만 가능)' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.foodsService.remove(id, user.id);
  }
}
