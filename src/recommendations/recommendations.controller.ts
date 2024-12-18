import { Controller, Get, Query } from '@nestjs/common';
import { EventType } from 'src/enums/event-type.enum';
import { Season } from 'src/enums/season.enum';
import { UsageType } from 'src/enums/usage-type.enum';
import { RecommendationsService } from './recommendations.service';
import { Parfum } from 'src/parfums/entities/parfums.entity';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private recommendationsService: RecommendationsService) {}

  @Get()
  async getRecommendations(
    @Query('season') season: Season,
    @Query('eventType') eventType: EventType,
    @Query('usageType') usageType: UsageType,
  ): Promise<Parfum[]> {
    return this.recommendationsService.getRecommendations(
      season,
      eventType,
      usageType,
    );
  }
}
