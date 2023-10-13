import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserCredentialDTO } from '../dto/user.credential.dto';
import { IUserCredential } from '../interface/user.credential.interface';
import { SigninDTO } from '../dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Ruta para crear un nuevo usuario.
   * @param data - Datos del usuario a registrar.
   * @returns Nada (void).
   */
  @Post('createUser')
  async createUser(@Body() data: UserCredentialDTO): Promise<void> {
    // Crea un objeto con los datos del usuario a partir de la solicitud.
    const userData: IUserCredential = {
      username: data.username,
      password: data.password,
      full_name: data.full_name,
    };

    // Llama al servicio para crear un nuevo usuario con los datos proporcionados.
    await this.authService.createUser(userData);
  }
  /**
   * Ruta para autenticar a un usuario y obtener un token JWT.
   * @param signinData - Datos de inicio de sesión del usuario.
   * @returns Token JWT de autenticación.
   */
  @Post('signin')
  async signin(@Body() signinData: SigninDTO): Promise<string> {
    // Llama al servicio para autenticar al usuario y obtener un token JWT.
    const token = await this.authService.signin(signinData);

    // Devuelve el token JWT como respuesta.
    return token;
  }
}
