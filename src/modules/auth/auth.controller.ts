import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
@ApiTags('Session')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  public async login(
    @Body() payload: CreateTokenDto,
  ): Promise<{ token: string }> {
    return await this.authService.login(payload);
  }
}
