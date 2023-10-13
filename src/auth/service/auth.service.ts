import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserCredential } from '../interface/user.credential.interface';
import { push, ref, set, get } from 'firebase/database';
import { firebaseDatabase } from 'src/firebase.config';
import { ISignin } from '../interface/signing.interface';
import * as jwt from 'jsonwebtoken';
import { SigninDTO } from '../dto/signin.dto';
import { EncoderService } from './passwordUtils';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly enconderService: EncoderService) {}
  async createUser(userData: IUserCredential): Promise<void> {
    userData.username = userData.username.toLowerCase();
    const dataRef = ref(firebaseDatabase, 'Usuarios');
    const snapshot = await get(dataRef);
    const users = snapshot.val();

    const hashedPassword = await this.enconderService.hashPassword(
      userData.password,
    );

    // Si la tabla esta vacia, crea el usuario sin validad si existe o no
    if (users == null) {
      userData.password = hashedPassword;
      const newElementRef = push(dataRef, { userdata: userData });
      await set(newElementRef, userData);
      console.log('Usuario creado exitosamente');
    } else {
      // Verifica si ya existe un usuario con el mismo nombre de usuario.
      const isDuplicateUser = Object.values(users).some(
        (user: IUserCredential) => {
          return user.username === userData.username;
        },
      );
      if (isDuplicateUser) {
        // Ya existe un usuario con el mismo nombre de usuario.
        throw new Error('El nombre de usuario ya está en uso.');
      } else {
        // No existe un usuario con el mismo nombre de usuario, puedes crearlo.
        userData.password = hashedPassword;
        const newElementRef = push(dataRef, { userdata: userData });
        await set(newElementRef, userData);
        console.log('Usuario creado exitosamente');
      }
    }
  }
  async signin(signinData: SigninDTO): Promise<string> {
    const username = signinData.username;
    signinData.username = signinData.username.toLowerCase();
    // Comprueba si el usuario existe en la base de datos por nombre de usuario
    const userRef = ref(firebaseDatabase, 'Usuarios');
    const snapshot = await get(userRef);
    const users = snapshot.val();

    const userExist = Object.values(users).find(
      (user: ISignin) => user.username === username,
    ) as ISignin;

    if (!userExist) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(
      signinData.password,
      userExist.password,
    );

    // Comprueba si la contraseña es correcta
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Genera un token JWT si la autenticación es exitosa
    const token = this.generateJwtToken(userExist);
    console.log(token);
    return token;
  }
  generateJwtToken(uid: ISignin): string {
    const secretKey = 'vchat'; // Cambia esto a tu propia clave secreta
    const expiresIn = '1h'; // Puedes personalizar la duración del token

    const token = jwt.sign({ uid }, secretKey, { expiresIn });

    return token;
  }
}
