import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EventType } from 'src/enums/event-type.enum';
import { Season } from 'src/enums/season.enum';
import { UsageType } from 'src/enums/usage-type.enum';
import { RecommendationsService } from './recommendations.service';
import { Parfum } from 'src/parfums/entities/parfums.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/enums/roles.enum';

@Controller('recommendations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecommendationsController {
  constructor(private recommendationsService: RecommendationsService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
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
