import { IsString, IsNumber } from 'class-validator';

export class CreateParfumDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  longevity: number;

  @IsNumber()
  sillage: number;

  @IsNumber()
  projection: number;

  @IsString()
  season: string;

  @IsString()
  eventType: string;
}
