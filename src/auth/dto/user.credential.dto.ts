import { IsNotEmpty, IsString, Length } from 'class-validator';
/**
 * Clase DTO para validar y estructurar los datos de credenciales de usuario.
 */
export class UserCredentialDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;
}
