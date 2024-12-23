import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parfum } from 'src/parfums/entities/parfums.entity';
import { Season } from 'src/enums/season.enum';
import { EventType } from 'src/enums/event-type.enum';
import { UsageType } from 'src/enums/usage-type.enum';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Parfum)
    private parfumsRepository: Repository<Parfum>,
  ) {}

  async getRecommendations(
    avgSeason: Season,
    avgEventType: EventType,
    avgUsageType: UsageType,
    page: number,
    limit: number,
  ): Promise<Parfum[]> {
    const [results, total] = await this.parfumsRepository.findAndCount({
      where: [
        { avgSeason, avgEventType, avgUsageType },
        { season: avgSeason, eventType: avgEventType, usageType: avgUsageType },
      ],
      order: {
        avgLongevity: 'DESC',
        avgSillage: 'DESC',
        avgProjection: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return results;
  }
}
