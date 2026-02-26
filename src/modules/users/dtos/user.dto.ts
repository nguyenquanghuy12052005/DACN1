export class CreateUserDto {
  username!: string;
  password!: string;
  email!: string;
  phone?: string;
  avatar?: string;
  departmentId?: number;
  positionId?: number;
}