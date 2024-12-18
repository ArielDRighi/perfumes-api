import { Module } from '@nestjs/common';
import { ParfumsService } from './parfums.service';
import { ParfumsController } from './parfums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parfum } from './entities/parfums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parfum])],
  providers: [ParfumsService],
  controllers: [ParfumsController],
})
export class ParfumsModule {}
