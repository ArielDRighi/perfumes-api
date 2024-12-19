import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Score } from '../../enums/score.enum';
import { Season } from '../../enums/season.enum';
import { EventType } from '../../enums/event-type.enum';
import { UsageType } from 'src/enums/usage-type.enum';

export class CreateRatingDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  perfumeId: number;

  @ApiProperty({ enum: Score, example: Score.One })
  @IsEnum(Score)
  @IsNotEmpty()
  longevity: Score;

  @ApiProperty({ enum: Score, example: Score.Two })
  @IsEnum(Score)
  @IsNotEmpty()
  sillage: Score;

  @ApiProperty({ enum: Score, example: Score.Three })
  @IsEnum(Score)
  @IsNotEmpty()
  projection: Score;

  @ApiProperty({ enum: Season, example: Season.Summer })
  @IsEnum(Season)
  @IsNotEmpty()
  season: Season;

  @ApiProperty({ enum: EventType, example: EventType.Casual })
  @IsEnum(EventType)
  @IsNotEmpty()
  eventType: EventType;

  @ApiProperty({ enum: UsageType, example: UsageType.Daily })
  @IsEnum(UsageType)
  @IsNotEmpty()
  usageType: UsageType;
}
