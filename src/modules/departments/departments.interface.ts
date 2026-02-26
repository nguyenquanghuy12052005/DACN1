export interface IDepartment {
  id: number;
  name: string;
  parentId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}