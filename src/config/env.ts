import { resolve } from 'path';
import { config } from 'dotenv';

const whichEnvFileToUse = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

config({ path: resolve(__dirname, '..', '..', whichEnvFileToUse) });
