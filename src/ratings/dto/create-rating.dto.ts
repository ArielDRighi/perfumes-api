import { IsEnum, IsNumber } from 'class-validator';
import { Score } from '../enums/score.enum';
import { Season } from '../enums/season.enum';
import { EventType } from '../enums/event-type.enum';

export class CreateRatingDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  perfumeId: number;

  @IsEnum(Score)
  longevity: Score;

  @IsEnum(Score)
  sillage: Score;

  @IsEnum(Score)
  projection: Score;

  @IsEnum(Season)
  season: Season;

  @IsEnum(EventType)
  eventType: EventType;
}
