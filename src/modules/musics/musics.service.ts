import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMusicDTO } from './dto/create-music.dto';
import { Music } from './entities';

@Injectable()
export class MusicsService {
  constructor(private prisma: PrismaService) {}

  public async create(payload: CreateMusicDTO, userId: string): Promise<Music> {
    const userExists = this.prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      throw new NotFoundException('User not found!');
    }

    const music = { ...payload, userId };
    const { user, ...musicData } = Object.assign(new Music(), music);

    const newMusic = await this.prisma.music.create({
      data: musicData,
      include: { user: true },
    });

    return plainToInstance(Music, newMusic);
  }

  public async findAll(): Promise<Array<Music>> {
    const allMusics = await this.prisma.music.findMany({
      include: { user: true },
    });

    return plainToInstance(Music, allMusics);
  }

  public async findOne(musicId: string): Promise<Music | undefined> {
    const foundMusic = await this.prisma.music.findUnique({
      where: { id: musicId },
      include: { user: true },
    });

    if (!foundMusic) {
      throw new NotFoundException('Music not found!');
    }

    return plainToInstance(Music, foundMusic);
  }
}
