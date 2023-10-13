import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserCredentialDTO } from '../dto/user.credential.dto';
import { IUserCredential } from '../interface/user.credential.interface';
import { SigninDTO } from '../dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('createUser')
  async createUser(@Body() data: UserCredentialDTO): Promise<void> {
    const datos: IUserCredential = {
      username: data.username,
      password: data.password,
      full_name: data.full_name,
    };
    await this.authService.createUser(datos);
  }
  @Post('signin')
  async signin(@Body() signinData: SigninDTO): Promise<string> {
    const token = await this.authService.signin(signinData);
    return token;
  }
}
