import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parfum } from './entities/parfums.entity';
import { Repository } from 'typeorm';
import { CreateParfumDto } from './dto/create-parfum.dto';
import { Rating } from 'src/ratings/entities/ratings.entity';

@Injectable()
export class ParfumsService {
  constructor(
    @InjectRepository(Parfum)
    private parfumsRepository: Repository<Parfum>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
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

  async updateParfumAverages(perfumeId: number): Promise<void> {
    try {
      const parfum = await this.parfumsRepository.findOne({
        where: { id: perfumeId },
        relations: ['ratings'],
      });
      if (!parfum) {
        throw new NotFoundException(`Perfume with ID ${perfumeId} not found`);
      }

      const ratings = parfum.ratings;
      const longevityAvg = this.calculateAverage(
        ratings.map((r) => r.longevity),
      );
      const sillageAvg = this.calculateAverage(ratings.map((r) => r.sillage));
      const projectionAvg = this.calculateAverage(
        ratings.map((r) => r.projection),
      );

      parfum.longevity = longevityAvg;
      parfum.sillage = sillageAvg;
      parfum.projection = projectionAvg;
      await this.parfumsRepository.save(parfum);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update perfume averages',
      );
    }
  }

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / values.length);
    return Math.min(Math.max(average, 1), 5);
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.parfumsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Perfume with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete perfume');
    }
  }
}
