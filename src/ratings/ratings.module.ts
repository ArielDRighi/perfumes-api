import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { ParfumsModule } from 'src/parfums/parfums.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), ParfumsModule, UsersModule],
  providers: [RatingsService],
  controllers: [RatingsController],
  exports: [TypeOrmModule, RatingsService],
})
export class RatingsModule {}
