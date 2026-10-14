import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeightsModule } from './weights/weights.module';
import { FoodsModule } from './foods/foods.module';
import { AiModule } from './ai/ai.module';
import { User } from './users/entities/user.entity';
import { Weight } from './weights/entities/weight.entity';
import { Food } from './foods/entities/food.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Weight, Food],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    WeightsModule,
    FoodsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
