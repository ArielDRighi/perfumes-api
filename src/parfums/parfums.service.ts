import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parfum } from './entities/parfums.entity';
import { Repository } from 'typeorm';
import { CreateParfumDto } from './dto/create-parfum.dto';

@Injectable()
export class ParfumsService {
  constructor(
    @InjectRepository(Parfum)
    private parfumsRepository: Repository<Parfum>,
  ) {}

  create(createParfumDto: CreateParfumDto) {
    const parfum = this.parfumsRepository.create(createParfumDto);
    return this.parfumsRepository.save(parfum);
  }

  findAll() {
    return this.parfumsRepository.find();
  }
}
