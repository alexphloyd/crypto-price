import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  salt = bcrypt.genSaltSync(10);

  async hash(data: string) {
    return await bcrypt.hash(data, this.salt);
  }

  async compare(hashedData: string) {
    return await bcrypt.compare(hashedData, this.salt);
  }
}
