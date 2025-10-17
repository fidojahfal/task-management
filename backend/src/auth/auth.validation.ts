import z from 'zod';

export class AuthValidation {
  static readonly REGISTER = z.object({
    name: z.string().min(1).max(100),
    username: z.string().min(1).max(100),
    password: z.string().min(8).max(255),
  });

  static readonly LOGIN = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(8).max(255),
  });
}
