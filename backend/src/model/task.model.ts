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
  user_id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
}
