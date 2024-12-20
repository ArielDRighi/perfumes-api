import {
  Body,
  Controller,
  Get,
  Post,
  InternalServerErrorException,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ParfumsService } from './parfums.service';
import { CreateParfumDto } from './dto/create-parfum.dto';
import { Parfum } from './entities/parfums.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('parfums')
@ApiBearerAuth('access-token')
@Controller('parfums')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParfumsController {
  constructor(private readonly parfumsService: ParfumsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new perfume' })
  @ApiResponse({
    status: 201,
    description: 'The perfume has been successfully created.',
    type: Parfum,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createParfumDto: CreateParfumDto): Promise<Parfum> {
    try {
      return await this.parfumsService.create(createParfumDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create perfume');
    }
  }

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all perfumes' })
  @ApiResponse({
    status: 200,
    description: 'Return all perfumes',
    type: [Parfum],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(): Promise<Parfum[]> {
    try {
      return await this.parfumsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch perfumes');
    }
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a perfume by ID' })
  @ApiResponse({ status: 200, description: 'Return the perfume', type: Parfum })
  @ApiResponse({ status: 404, description: 'Perfume not found' })
  async findOne(@Param('id') id: number): Promise<Parfum> {
    return await this.parfumsService.findOneById(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a perfume by ID' })
  @ApiResponse({ status: 204, description: 'Perfume deleted' })
  @ApiResponse({ status: 404, description: 'Perfume not found' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.parfumsService.remove(id);
  }
}
