import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weight } from './entities/weight.entity';
import { WeightsService } from './weights.service';
import { WeightsController } from './weights.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Weight])],
  controllers: [WeightsController],
  providers: [WeightsService],
})
export class WeightsModule {}
