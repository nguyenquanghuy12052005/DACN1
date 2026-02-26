export class CreateUserDto {
  username!: string;
  password!: string;
  email!: string;
  phone?: string;
  avatar?: string;
  departmentId?: number;
  positionId?: number;
}

export class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  avatar?: string;
  departmentId?: number;
  positionId?: number;
  status?: string;
}