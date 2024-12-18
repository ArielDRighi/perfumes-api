import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Score } from '../../enums/score.enum';
import { Season } from '../../enums/season.enum';
import { EventType } from '../../enums/event-type.enum';
import { UsageType } from '../../enums/usage-type.enum';

export class CreateParfumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Score)
  @IsNotEmpty()
  longevity: Score;

  @IsEnum(Score)
  @IsNotEmpty()
  sillage: Score;

  @IsEnum(Score)
  @IsNotEmpty()
  projection: Score;

  @IsEnum(Season)
  @IsNotEmpty()
  season: Season;

  @IsEnum(EventType)
  @IsNotEmpty()
  eventType: EventType;

  @IsEnum(UsageType)
  @IsNotEmpty()
  usageType: UsageType;
}
