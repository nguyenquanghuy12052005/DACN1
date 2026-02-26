export class CreateDepartmentDto {
  name!: string;
  parentId!: number | null;
}

export class UpdateDepartmentDto {
  name?: string;
  parentId?: number | null;
}