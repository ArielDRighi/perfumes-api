import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from 'src/enums/event-type.enum';
import { Season } from 'src/enums/season.enum';
import { UsageType } from 'src/enums/usage-type.enum';
import { Parfum } from 'src/parfums/entities/parfums.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Parfum) private parfumeRepository: Repository<Parfum>,
  ) {}

  async getRecommendations(
    season: Season,
    eventType: EventType,
    usageType: UsageType,
  ) {
    try {
      const parfums = await this.parfumeRepository.find({
        where: {
          season,
          eventType,
          usageType,
        },
      });
      const sortedParfumes = parfums
        .map((parfum) => ({
          ...parfum,
          averageScore:
            (parfum.longevity + parfum.sillage + parfum.projection) / 3,
        }))
        .sort((a, b) => b.averageScore - a.averageScore);

      return sortedParfumes;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch recommendations');
    }
  }
}
