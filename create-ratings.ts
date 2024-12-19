import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { RatingsService } from './src/ratings/ratings.service';
import { UsersService } from './src/users/users.service';
import { ParfumsService } from './src/parfums/parfums.service';
import { CreateRatingDto } from './src/ratings/dto/create-rating.dto';
import { Score } from './src/enums/score.enum';
import { Season } from './src/enums/season.enum';
import { EventType } from './src/enums/event-type.enum';
import { UsageType } from './src/enums/usage-type.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ratingsService = app.get(RatingsService);
  const usersService = app.get(UsersService);
  const parfumsService = app.get(ParfumsService);

  const users = await usersService.findAll();
  const perfumes = await parfumsService.findAll();

  if (users.length < 5 || perfumes.length < 10) {
    console.error('Not enough users or perfumes found in the database.');
    await app.close();
    return;
  }

  const ratings: CreateRatingDto[] = [
    {
      userId: users[0].id,
      perfumeId: perfumes[0].id,
      longevity: Score.Five,
      sillage: Score.Four,
      projection: Score.Three,
      season: Season.Summer,
      eventType: EventType.Formal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      userId: users[1].id,
      perfumeId: perfumes[1].id,
      longevity: Score.Four,
      sillage: Score.Three,
      projection: Score.Five,
      season: Season.Fall,
      eventType: EventType.Casual,
      usageType: UsageType.Daily,
    },
    {
      userId: users[2].id,
      perfumeId: perfumes[2].id,
      longevity: Score.Five,
      sillage: Score.Five,
      projection: Score.Four,
      season: Season.Winter,
      eventType: EventType.SemiFormal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      userId: users[3].id,
      perfumeId: perfumes[3].id,
      longevity: Score.Three,
      sillage: Score.Four,
      projection: Score.Five,
      season: Season.Spring,
      eventType: EventType.Sport,
      usageType: UsageType.Daily,
    },
    {
      userId: users[4].id,
      perfumeId: perfumes[4].id,
      longevity: Score.Four,
      sillage: Score.Three,
      projection: Score.Four,
      season: Season.Summer,
      eventType: EventType.Formal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      userId: users[0].id,
      perfumeId: perfumes[5].id,
      longevity: Score.Two,
      sillage: Score.Two,
      projection: Score.Two,
      season: Season.Fall,
      eventType: EventType.Casual,
      usageType: UsageType.Daily,
    },
    {
      userId: users[1].id,
      perfumeId: perfumes[6].id,
      longevity: Score.Three,
      sillage: Score.Three,
      projection: Score.Three,
      season: Season.Winter,
      eventType: EventType.SemiFormal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      userId: users[2].id,
      perfumeId: perfumes[7].id,
      longevity: Score.Four,
      sillage: Score.Four,
      projection: Score.Four,
      season: Season.Spring,
      eventType: EventType.Sport,
      usageType: UsageType.Daily,
    },
    {
      userId: users[3].id,
      perfumeId: perfumes[8].id,
      longevity: Score.Five,
      sillage: Score.Five,
      projection: Score.Five,
      season: Season.Summer,
      eventType: EventType.Formal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      userId: users[4].id,
      perfumeId: perfumes[9].id,
      longevity: Score.One,
      sillage: Score.One,
      projection: Score.One,
      season: Season.Fall,
      eventType: EventType.Casual,
      usageType: UsageType.Daily,
    },
  ];

  try {
    for (const rating of ratings) {
      await ratingsService.create(rating);
    }
    console.log('Ratings created successfully');
  } catch (error) {
    console.error('Error creating ratings:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
