import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weight } from './entities/weight.entity';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';

@Injectable()
export class WeightsService {
  constructor(
    @InjectRepository(Weight)
    private readonly weightsRepository: Repository<Weight>,
  ) {}

  async findAllByUser(userId: number): Promise<Weight[]> {
    return this.weightsRepository.find({
      where: { userId },
      order: { recordedAt: 'DESC' },
    });
  }

  async create(userId: number, dto: CreateWeightDto): Promise<Weight> {
    const weight = this.weightsRepository.create({ ...dto, userId });
    return this.weightsRepository.save(weight);
  }

  async update(
    id: number,
    userId: number,
    dto: UpdateWeightDto,
  ): Promise<Weight> {
    const weight = await this.findOwnedOrThrow(id, userId);
    Object.assign(weight, dto);
    return this.weightsRepository.save(weight);
  }

  async remove(id: number, userId: number): Promise<void> {
    const weight = await this.findOwnedOrThrow(id, userId);
    await this.weightsRepository.remove(weight);
  }

  private async findOwnedOrThrow(id: number, userId: number): Promise<Weight> {
    const weight = await this.weightsRepository.findOne({ where: { id } });
    if (!weight) {
      throw new NotFoundException('존재하지 않는 몸무게 기록입니다.');
    }
    if (weight.userId !== userId) {
      throw new ForbiddenException('자신의 기록만 수정할 수 있습니다.');
    }
    return weight;
  }
}
