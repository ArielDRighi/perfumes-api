import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParfumsService } from './parfums.service';
import { CreateParfumDto } from './dto/create-parfum.dto';

@Controller('parfums')
export class ParfumsController {
  constructor(private readonly parfumsService: ParfumsService) {}

  @Post()
  create(@Body() createParfumDto: CreateParfumDto) {
    return this.parfumsService.create(createParfumDto);
  }

  @Get()
  findAll() {
    return this.parfumsService.findAll();
  }
}
