export class TaskResponse {
  task_id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  deadline: Date;
  created_by: number;
}

export class TaskCreateRequest {
  title: string;
  description: string;
  status: string;
  deadline: string;
}

export class TaskUpdateRequest {
  task_id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
}
