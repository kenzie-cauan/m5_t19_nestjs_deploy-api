import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateMusicDTO } from './dto/create-music.dto';
import { MusicsService } from './musics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Music } from './entities';

@ApiTags('Music')
@Controller('api/musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body() createMusicDTO: CreateMusicDTO,
    @Request() req,
  ): Promise<Music> {
    return await this.musicsService.create(createMusicDTO, req.user.id);
  }

  @Get()
  public async findAll(): Promise<Array<Music>> {
    return await this.musicsService.findAll();
  }

  @Get(':musicId')
  public async findOne(@Param('musicId') musicId: string): Promise<Music> {
    return await this.musicsService.findOne(musicId);
  }
}
