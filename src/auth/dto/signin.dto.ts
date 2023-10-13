import { IsNotEmpty, IsString, Length } from 'class-validator';
/**
 * Clase DTO para validar y estructurar los datos de inicio de sesión.
 */
export class SigninDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
