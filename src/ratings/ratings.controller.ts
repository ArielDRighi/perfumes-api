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

@Controller('ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private parfumsService: ParfumsService,
  ) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    try {
      return await this.ratingsService.create(createRatingDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create rating');
    }
  }

  @Post(':perfumeId/rate')
  @Roles(UserRole.USER)
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
  async findAll(): Promise<Rating[]> {
    try {
      return await this.ratingsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch ratings');
    }
  }

  @Get(':id')
  @Roles(UserRole.USER)
  async findOne(@Param('id') id: number): Promise<Rating> {
    try {
      return await this.ratingsService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch rating');
    }
  }

  @Put(':id')
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
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.ratingsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete rating');
    }
  }
}
