import { Module } from '@nestjs/common';
import { ParfumsService } from './parfums.service';
import { ParfumsController } from './parfums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parfum } from './entities/parfums.entity';
import { Rating } from 'src/ratings/entities/ratings.entity';
import { RatingsService } from 'src/ratings/ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parfum, Rating])],
  providers: [ParfumsService],
  controllers: [ParfumsController],
  exports: [TypeOrmModule],
})
export class ParfumsModule {}
