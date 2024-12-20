import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Score } from 'src/enums/score.enum';
import { EventType } from 'src/enums/event-type.enum';
import { Season } from 'src/enums/season.enum';
import { UsageType } from 'src/enums/usage-type.enum';

export class CreateRatingDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  parfumId: number;

  @ApiProperty({ enum: Score, example: Score.Five })
  @IsEnum(Score)
  @IsOptional()
  longevity?: Score;

  @ApiProperty({ enum: Score, example: Score.Four })
  @IsEnum(Score)
  @IsOptional()
  sillage?: Score;

  @ApiProperty({ enum: Score, example: Score.Three })
  @IsEnum(Score)
  @IsOptional()
  projection?: Score;

  @ApiProperty({ enum: EventType, example: EventType.Casual })
  @IsEnum(EventType)
  @IsOptional()
  eventType?: EventType;

  @ApiProperty({ enum: Season, example: Season.Summer })
  @IsEnum(Season)
  @IsOptional()
  season?: Season;

  @ApiProperty({ enum: UsageType, example: UsageType.Daily })
  @IsEnum(UsageType)
  @IsOptional()
  usageType?: UsageType;

  @ApiProperty({ example: 'Great perfume!', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
