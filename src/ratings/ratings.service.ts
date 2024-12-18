import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/ratings.entity';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingsRepository.create(createRatingDto);
    return this.ratingsRepository.save(rating);
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingsRepository.find();
  }

  async findOne(id: number): Promise<Rating> {
    const rating = await this.ratingsRepository.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    return rating;
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    await this.findOne(id);
    await this.ratingsRepository.update(id, updateRatingDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ratingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
  }
}
