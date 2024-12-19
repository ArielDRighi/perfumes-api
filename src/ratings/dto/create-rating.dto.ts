import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Score } from 'src/enums/score.enum';

export class CreateRatingDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  parfumId: number;

  @ApiProperty({ enum: Score, example: Score.Five })
  @IsEnum(Score)
  @IsNotEmpty()
  longevity: Score;

  @ApiProperty({ enum: Score, example: Score.Four })
  @IsEnum(Score)
  @IsNotEmpty()
  sillage: Score;

  @ApiProperty({ enum: Score, example: Score.Three })
  @IsEnum(Score)
  @IsNotEmpty()
  projection: Score;

  @ApiProperty({ example: 'Great perfume!', required: false })
  @IsString()
  @IsOptional()
  comment: string;
}
