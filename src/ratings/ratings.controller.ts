import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Param, Req } from '@nestjs/common';
import { UserRole } from 'src/enums/roles.enum';
import { Rating } from './entities/rating.entity';

@ApiTags('ratings')
@ApiBearerAuth('access-token')
@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Rate a parfum' })
  @ApiParam({ name: 'id', description: 'Parfum ID' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({
    status: 201,
    description: 'The rating has been successfully created.',
    type: Rating,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async rateParfum(
    @Param('id') parfumId: number,
    @Body() createRatingDto: Partial<CreateRatingDto>,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.ratingsService.create({ ...createRatingDto, userId, parfumId });
  }
}
