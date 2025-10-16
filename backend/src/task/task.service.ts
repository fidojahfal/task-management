import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { TaskCreateRequest, TaskResponse } from '../model/task.model';
import { Login } from '@prisma/client';
import { ValidationService } from '../common/validation/validation.service';
import { TaskValidation } from './task.validation';

@Injectable()
export class TaskService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(user: Login, request: TaskCreateRequest): Promise<TaskResponse> {
    const createRequest: TaskCreateRequest = this.validationService.validate(
      TaskValidation.CREATE,
      request,
    );

    const checkUser = await this.prismaService.login.findUnique({
      where: {
        user_id: createRequest.user_id,
      },
    });

    if (!checkUser) {
      throw new HttpException('User not found!', 404);
    }

    const task = await this.prismaService.task.create({
      data: { ...createRequest, created_by: user.user_id },
    });

    return {
      task_id: task.task_id,
      user_id: task.user_id,
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      created_by: task.created_by,
    };
  }
}
