import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodsRepository: Repository<Food>,
  ) {}

  async findAllByUser(userId: number): Promise<Food[]> {
    return this.foodsRepository.find({
      where: { userId },
      order: { eatenAt: 'DESC' },
    });
  }

  async create(userId: number, dto: CreateFoodDto): Promise<Food> {
    const food = this.foodsRepository.create({ ...dto, userId });
    return this.foodsRepository.save(food);
  }

  async update(id: number, userId: number, dto: UpdateFoodDto): Promise<Food> {
    const food = await this.findOwnedOrThrow(id, userId);
    Object.assign(food, dto);
    return this.foodsRepository.save(food);
  }

  async remove(id: number, userId: number): Promise<void> {
    const food = await this.findOwnedOrThrow(id, userId);
    await this.foodsRepository.remove(food);
  }

  private async findOwnedOrThrow(id: number, userId: number): Promise<Food> {
    const food = await this.foodsRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException('존재하지 않는 음식 기록입니다.');
    }
    if (food.userId !== userId) {
      throw new ForbiddenException('자신의 기록만 수정할 수 있습니다.');
    }
    return food;
  }
}
