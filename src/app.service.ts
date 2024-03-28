import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('change in services');
    console.log('change in services');
    return 'Hello World!';
  }
}
