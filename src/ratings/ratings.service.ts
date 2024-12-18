import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const rating = this.ratingsRepository.create(createRatingDto);
      return await this.ratingsRepository.save(rating);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create rating');
    }
  }

  async findAll(): Promise<Rating[]> {
    try {
      return await this.ratingsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch ratings');
    }
  }

  async findOne(id: number): Promise<Rating> {
    try {
      const rating = await this.ratingsRepository.findOne({ where: { id } });
      if (!rating) {
        throw new NotFoundException(`Rating with ID ${id} not found`);
      }
      return rating;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch rating');
    }
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    try {
      await this.findOne(id);
      await this.ratingsRepository.update(id, updateRatingDto);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update rating');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.ratingsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Rating with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete rating');
    }
  }
}
