export class AuthRegisterRequest {
  name: string;
  username: string;
  password: string;
}

export class AuthResponse {
  user_id: number;
  name: string;
  username: string;
  token?: string;
}
