import z from 'zod';

export class TaskValidation {
  static readonly CREATE = z.object({
    user_id: z.number().min(1),
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    status: z.string().min(1).max(50),
    deadline: z.iso.datetime(),
  });

  static readonly UPDATE = z.object({
    task_id: z.number().min(1),
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    status: z.string().min(1).max(50),
    deadline: z.iso.datetime(),
  });
}
