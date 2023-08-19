import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  salt = bcrypt.genSaltSync(10);

  async hash(textToHash: string) {
    return await bcrypt.hash(textToHash, this.salt);
  }

  async compare(plainText: string, hashedText: string) {
    return await bcrypt.compare(plainText, hashedText);
  }
}
