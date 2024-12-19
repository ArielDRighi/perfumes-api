import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async create(createParfumDto: CreateParfumDto): Promise<Parfum> {
    try {
      const parfum = this.parfumsRepository.create(createParfumDto);
      return await this.parfumsRepository.save(parfum);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create perfume');
    }
  }

  async findAll(): Promise<Parfum[]> {
    try {
      return await this.parfumsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch perfumes');
    }
  }

  async findOneById(id: number): Promise<Parfum> {
    const parfum = await this.parfumsRepository.findOne({ where: { id } });
    if (!parfum) {
      throw new NotFoundException(`Perfume with ID ${id} not found`);
    }
    return parfum;
  }

  async findOne(id: number): Promise<Parfum> {
    return this.parfumsRepository.findOne({ where: { id } });
  }

  async updateAverages(
    id: number,
    avgLongevity: number,
    avgSillage: number,
    avgProjection: number,
  ): Promise<void> {
    await this.parfumsRepository.update(id, {
      avgLongevity,
      avgSillage,
      avgProjection,
    });
  }
}
