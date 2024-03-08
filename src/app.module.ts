import { Module } from '@nestjs/common';
import { UsersModule, MusicsModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, MusicsModule, AuthModule],
})
export class AppModule {}
