import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/interfaces/encrypter'
export class BcryptAdapter implements Encrypter {
  private readonly salt
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value,this.salt)
    return hash
  }
}
