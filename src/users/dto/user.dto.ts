export class CreateUserDto {}

export interface User {
  username: string;
  // email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}
