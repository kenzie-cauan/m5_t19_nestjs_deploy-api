import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('api/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @HttpCode(201)
  @Post('register')
  public async create(@Body() payload: CreateUserDto): Promise<User> {
    return await this.service.create(payload);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async findAll(): Promise<Array<User>> {
    return await this.service.findAll();
  }

  @Get(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('userId') userId: string): Promise<User> {
    return await this.service.findOne(userId);
  }

  @Patch(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('userId') userId: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return await this.service.update(userId, payload);
  }

  @HttpCode(204)
  @ApiBearerAuth()
  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('userId') userId: string): Promise<void> {
    return await this.service.delete(userId);
  }
}
