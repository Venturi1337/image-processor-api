import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class Md5HashGeneratorAdapter {
  generate(input: string): string {
    return crypto.createHash('md5').update(input).digest('hex');
  }
}
