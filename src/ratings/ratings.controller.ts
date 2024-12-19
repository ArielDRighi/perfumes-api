import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/ratings.entity';
import { RatingsService } from './ratings.service';
import { ParfumsService } from 'src/parfums/parfums.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/enums/roles.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ratings')
@Controller('ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private parfumsService: ParfumsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rating' })
  @ApiResponse({
    status: 201,
    description: 'The rating has been successfully created.',
    type: Rating,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    try {
      return await this.ratingsService.create(createRatingDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create rating');
    }
  }

  @Post(':perfumeId/rate')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Rate a perfume' })
  @ApiResponse({
    status: 201,
    description: 'The perfume has been successfully rated.',
  })
  @ApiResponse({ status: 404, description: 'Perfume not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async rateParfum(
    @Param('perfumeId') perfumeId: number,
    @Body() ratingDto: CreateRatingDto,
  ): Promise<void> {
    try {
      const parfum = await this.parfumsService.findOneById(perfumeId);
      if (parfum === null) {
        throw new NotFoundException(`Perfume with ID ${perfumeId} not found`);
      }
      await this.ratingsService.create({
        perfumeId: perfumeId,
        userId: ratingDto.userId,
        longevity: ratingDto.longevity,
        sillage: ratingDto.sillage,
        projection: ratingDto.projection,
        season: ratingDto.season,
        eventType: ratingDto.eventType,
        usageType: ratingDto.usageType,
      });

      await this.parfumsService.updateParfumAverages(perfumeId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to rate perfume');
    }
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({
    status: 200,
    description: 'Return all ratings',
    type: [Rating],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(): Promise<Rating[]> {
    try {
      return await this.ratingsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch ratings');
    }
  }

  @Get(':id')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Get a rating by ID' })
  @ApiResponse({ status: 200, description: 'Return the rating', type: Rating })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: number): Promise<Rating> {
    try {
      return await this.ratingsService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch rating');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a rating' })
  @ApiResponse({
    status: 200,
    description: 'The rating has been successfully updated.',
    type: Rating,
  })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(
    @Param('id') id: number,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<Rating> {
    try {
      return await this.ratingsService.update(id, updateRatingDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update rating');
    }
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a rating' })
  @ApiResponse({
    status: 200,
    description: 'The rating has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.ratingsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete rating');
    }
  }
}
