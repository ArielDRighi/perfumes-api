import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ParfumsService } from './src/parfums/parfums.service';
import { CreateParfumDto } from './src/parfums/dto/create-parfum.dto';
import { Score } from './src/enums/score.enum';
import { Season } from './src/enums/season.enum';
import { EventType } from './src/enums/event-type.enum';
import { UsageType } from './src/enums/usage-type.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const parfumsService = app.get(ParfumsService);

  const perfumes: CreateParfumDto[] = [
    {
      name: 'Chanel No. 5',
      description: 'A classic fragrance with a floral scent.',
      longevity: Score.Five,
      sillage: Score.Four,
      projection: Score.Three,
      season: Season.Summer,
      eventType: EventType.Formal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      name: 'Dior Sauvage',
      description: 'A fresh and spicy fragrance.',
      longevity: Score.Four,
      sillage: Score.Three,
      projection: Score.Five,
      season: Season.Fall,
      eventType: EventType.Casual,
      usageType: UsageType.Daily,
    },
    {
      name: 'Tom Ford Black Orchid',
      description: 'A luxurious and sensual fragrance.',
      longevity: Score.Five,
      sillage: Score.Five,
      projection: Score.Four,
      season: Season.Winter,
      eventType: EventType.SemiFormal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      name: 'Versace Eros',
      description: 'A bold and passionate fragrance.',
      longevity: Score.Three,
      sillage: Score.Four,
      projection: Score.Five,
      season: Season.Spring,
      eventType: EventType.Sport,
      usageType: UsageType.Daily,
    },
    {
      name: 'Gucci Bloom',
      description: 'A floral and elegant fragrance.',
      longevity: Score.Four,
      sillage: Score.Three,
      projection: Score.Four,
      season: Season.Summer,
      eventType: EventType.Formal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      name: 'Dior Sauvage Elixir',
      description:
        'A bold and magnetic fragrance that exudes strength, with spicy, woody notes for the modern, confident man.',
      longevity: Score.Five,
      sillage: Score.Four,
      projection: Score.Three,
      season: Season.Winter,
      eventType: EventType.Formal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      name: 'Moschino Toy Boy',
      description:
        'A playful and seductive fragrance blending floral and spicy accords, perfect for those who embrace charm and originality.',
      longevity: Score.Four,
      sillage: Score.Three,
      projection: Score.Four,
      season: Season.Spring,
      eventType: EventType.Casual,
      usageType: UsageType.Daily,
    },
    {
      name: 'Dior Homme Parfum',
      description:
        'An intense and refined fragrance with leathery and woody undertones, radiating sophistication and timeless elegance.',
      longevity: Score.Five,
      sillage: Score.Five,
      projection: Score.Four,
      season: Season.Fall,
      eventType: EventType.SemiFormal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      name: 'Givenchy Gentleman Reserve Privee',
      description:
        'A warm and luxurious scent, combining whiskey-inspired notes with rich woods, embodying charisma and exclusivity.',
      longevity: Score.Four,
      sillage: Score.Three,
      projection: Score.Four,
      season: Season.Winter,
      eventType: EventType.Formal,
      usageType: UsageType.SpecialOccasions,
    },
    {
      name: 'Tom Ford Ombré Leather',
      description:
        'A sensual and rugged fragrance with leathery, smoky notes, evoking untamed landscapes and effortless style.',
      longevity: Score.Five,
      sillage: Score.Four,
      projection: Score.Three,
      season: Season.Fall,
      eventType: EventType.Casual,
      usageType: UsageType.Daily,
    },
  ];

  try {
    for (const perfume of perfumes) {
      await parfumsService.create(perfume);
    }
    console.log('Perfumes created successfully');
  } catch (error) {
    console.error('Error creating perfumes:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
