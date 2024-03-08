import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async create(payload: CreateUserDto): Promise<User> {
    const findUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (findUser) {
      throw new ConflictException('E-mail already exists!');
    }

    const user = new User();
    Object.assign(user, payload);
    await this.prisma.user.create({ data: user });

    return plainToInstance(User, user);
  }

  public async findAll(): Promise<Array<User>> {
    const allUsers = await this.prisma.user.findMany();
    return plainToInstance(User, allUsers);
  }

  public async findOne(userId: string): Promise<User | undefined> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return plainToInstance(User, foundUser);
  }

  public async update(userId: string, payload: UpdateUserDto): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: payload,
    });
    return plainToInstance(User, updatedUser);
  }

  public async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
