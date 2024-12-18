import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/ratings.entity';
import { ParfumsService } from 'src/parfums/parfums.service';
import { Parfum } from 'src/parfums/entities/parfums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Parfum])],
  providers: [RatingsService, ParfumsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
