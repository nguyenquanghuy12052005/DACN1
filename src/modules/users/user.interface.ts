export interface IUser {
  id: number;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: "active" | "inactive" | "suspended" | "resigned";
  departmentId?: number;
  positionId?: number;
  createdAt: Date;
  updatedAt: Date;
}