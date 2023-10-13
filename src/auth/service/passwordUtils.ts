import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
/**
 * Servicio para manejar operaciones relacionadas con la encriptación de contraseñas.
 */
@Injectable()
export class EncoderService {
  /**
   * Hashea una contraseña.
   * @param password - Contraseña a ser hasheada.
   * @returns Contraseña hasheada.
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas para el hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  /**
   * Verifica si una contraseña coincide con una contraseña hasheada.
   * @param password - Contraseña a verificar.
   * @param userPassword - Contraseña almacenada (hasheada) en el sistema.
   * @returns `true` si la contraseña coincide, de lo contrario, `false`.
   */
  async checkPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}
