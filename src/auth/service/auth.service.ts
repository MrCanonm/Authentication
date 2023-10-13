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
    // Normaliza el nombre de usuario a minúsculas para evitar duplicados.
    userData.username = userData.username.toLowerCase();

    // Define una referencia a la ubicación 'Usuarios' en la base de datos.
    const dataRef = ref(firebaseDatabase, 'Usuarios');

    // Obtiene un snapshot de los datos en la ubicación 'Usuarios'.
    const snapshot = await get(dataRef);
    const users = snapshot.val();

    // Hashea la contraseña del usuario.
    const hashedPassword = await this.enconderService.hashPassword(
      userData.password,
    );

    // Verifica si la tabla está vacía y, en ese caso, crea el usuario sin validar su existencia.
    if (users == null) {
      userData.password = hashedPassword;

      // Crea una nueva entrada en la ubicación 'Usuarios' con los datos del usuario.
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

        // Crea una nueva entrada en la ubicación 'Usuarios' con los datos del usuario.
        const newElementRef = push(dataRef, { userdata: userData });
        await set(newElementRef, userData);

        console.log('Usuario creado exitosamente');
      }
    }
  }
  async signin(signinData: SigninDTO): Promise<string> {
    const username = signinData.username;
    signinData.username = signinData.username.toLowerCase();

    // Define una referencia a la ubicación 'Usuarios' en la base de datos.
    const userRef = ref(firebaseDatabase, 'Usuarios');

    // Obtiene un snapshot de los datos en la ubicación 'Usuarios'.
    const snapshot = await get(userRef);
    const users = snapshot.val();

    // Encuentra al usuario por nombre de usuario.
    const userExist = Object.values(users).find(
      (user: ISignin) => user.username === username,
    ) as ISignin;

    if (!userExist) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verifica si la contraseña es correcta utilizando bcrypt.
    const isPasswordValid = await this.enconderService.checkPassword(
      signinData.password,
      userExist.password,
    );

    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Genera un token JWT si la autenticación es exitosa.
    const token = this.generateJwtToken(userExist);
    console.log(token);
    return token;
  }
  generateJwtToken(uid: ISignin): string {
    const secretKey = 'vchat'; // Debes cambiar esto a una clave secreta segura y única.
    const expiresIn = '1h'; // Puedes personalizar la duración del token según tus necesidades.

    // Genera un token JWT con el identificador de usuario (uid) como carga útil.
    const token = jwt.sign({ uid }, secretKey, { expiresIn });

    return token;
  }
}
