import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { EncoderService } from './service/passwordUtils';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EncoderService],
})
export class AuthModule {}
