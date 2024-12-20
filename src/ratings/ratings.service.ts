import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ParfumsService } from 'src/parfums/parfums.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    private parfumsService: ParfumsService,
    private usersService: UsersService,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const {
      userId,
      parfumId,
      longevity,
      sillage,
      projection,
      season,
      usageType,
      eventType,
      comment,
    } = createRatingDto;

    const user = await this.usersService.findOne(userId);
    const parfum = await this.parfumsService.findOne(parfumId);

    if (!user || !parfum) {
      throw new BadRequestException('User or Parfum not found');
    }

    const existingRating = await this.ratingsRepository.findOne({
      where: { user, parfum },
    });
    if (existingRating) {
      throw new BadRequestException('User has already rated this perfume');
    }

    const rating = this.ratingsRepository.create({
      user,
      parfum,
      longevity,
      sillage,
      projection,
      season,
      usageType,
      eventType,
      comment,
    });
    await this.ratingsRepository.save(rating);

    await this.updateParfumAverages(parfumId);

    return rating;
  }

  private async updateParfumAverages(parfumId: number) {
    const ratings = await this.ratingsRepository.find({
      where: { parfum: { id: parfumId } },
    });

    const avgLongevity =
      ratings.reduce((sum, rating) => sum + rating.longevity, 0) /
      ratings.length;
    const avgSillage =
      ratings.reduce((sum, rating) => sum + rating.sillage, 0) / ratings.length;
    const avgProjection =
      ratings.reduce((sum, rating) => sum + rating.projection, 0) /
      ratings.length;

    const avgSeason = this.calculateMode(
      ratings.map((rating) => rating.season),
    );
    const avgEventType = this.calculateMode(
      ratings.map((rating) => rating.eventType),
    );
    const avgUsageType = this.calculateMode(
      ratings.map((rating) => rating.usageType),
    );

    await this.parfumsService.updateAverages(
      parfumId,
      avgLongevity,
      avgSillage,
      avgProjection,
      avgSeason,
      avgEventType,
      avgUsageType,
    );
  }

  private calculateMode(arr: any[]): any {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length,
      )
      .pop();
  }
}
