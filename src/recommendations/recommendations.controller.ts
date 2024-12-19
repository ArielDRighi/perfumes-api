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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('recommendations')
@ApiBearerAuth('access-token')
@Controller('recommendations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecommendationsController {
  constructor(private recommendationsService: RecommendationsService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get perfume recommendations' })
  @ApiResponse({
    status: 200,
    description: 'Return perfume recommendations',
    type: [Parfum],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiQuery({ name: 'season', enum: Season, required: false })
  @ApiQuery({ name: 'eventType', enum: EventType, required: false })
  @ApiQuery({ name: 'usageType', enum: UsageType, required: false })
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
