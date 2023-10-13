import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
