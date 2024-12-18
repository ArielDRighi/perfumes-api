import {
  Body,
  Controller,
  Get,
  Post,
  InternalServerErrorException,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ParfumsService } from './parfums.service';
import { CreateParfumDto } from './dto/create-parfum.dto';
import { Parfum } from './entities/parfums.entity';

@Controller('parfums')
export class ParfumsController {
  constructor(private readonly parfumsService: ParfumsService) {}

  @Post()
  async create(@Body() createParfumDto: CreateParfumDto): Promise<Parfum> {
    try {
      return await this.parfumsService.create(createParfumDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create perfume');
    }
  }

  @Get()
  async findAll(): Promise<Parfum[]> {
    try {
      return await this.parfumsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch perfumes');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Parfum> {
    return await this.parfumsService.findOneById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.parfumsService.remove(id);
      return { message: 'El perfume ha sido eliminado con éxito' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete perfume');
    }
  }
}
