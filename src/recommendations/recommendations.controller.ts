import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Season } from 'src/enums/season.enum';
import { EventType } from 'src/enums/event-type.enum';
import { UsageType } from 'src/enums/usage-type.enum';

@ApiTags('recommendations')
@ApiBearerAuth('access-token')
@Controller('recommendations')
@UseGuards(JwtAuthGuard)
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get()
  @ApiQuery({ name: 'season', enum: Season })
  @ApiQuery({ name: 'eventType', enum: EventType })
  @ApiQuery({ name: 'usageType', enum: UsageType })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getRecommendations(
    @Query('season') season: Season,
    @Query('eventType') eventType: EventType,
    @Query('usageType') usageType: UsageType,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.recommendationsService.getRecommendations(
      season,
      eventType,
      usageType,
      page,
      limit,
    );
  }
}
