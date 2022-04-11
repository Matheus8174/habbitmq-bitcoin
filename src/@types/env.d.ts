/* eslint-disable @typescript-eslint/naming-convention */
import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PRICES_API: string;
      QUEUE_NAME: stirng;
      AMQP_SERVER: string;
    }
  }
}
