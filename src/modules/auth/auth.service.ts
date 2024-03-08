import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from './dto/create-token.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login({
    email,
    password,
  }: CreateTokenDto): Promise<{ token: string }> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const hasSamePassword = await compare(password, user.password);
    if (!hasSamePassword) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const token = this.jwtService.sign({ email }, { subject: user.id });

    return { token };
  }
}
