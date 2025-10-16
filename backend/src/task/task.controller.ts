import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Auth } from '../common/decorator/auth.decorator';
import { type Login } from '@prisma/client';
import { TaskCreateRequest, TaskResponse } from '../model/task.model';
import { WebResponse } from '../model/web.model';
import { TaskService } from './task.service';

@Controller('/api/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post('/create')
  @HttpCode(200)
  async create(
    @Auth() user: Login,
    @Body() request: TaskCreateRequest,
  ): Promise<WebResponse<TaskResponse>> {
    console.log(request);

    const result = await this.taskService.create(user, request);

    return {
      data: result,
    };
  }
}
