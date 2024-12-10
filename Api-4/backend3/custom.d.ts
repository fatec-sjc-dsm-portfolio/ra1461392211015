// custom.d.ts

import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface UserPayload {
    id: string;
    nome: string;
    email: string;
    role?: string;
  }

  interface Request {
    user?: UserPayload;
  }
}
