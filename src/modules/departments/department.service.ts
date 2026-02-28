import { injectable } from "inversify";
import { AppDataSource } from "../../core/database/postgreSQL";
import { DepartmentEntity } from "./department.entity";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./dtos/department.dto";

@injectable()
export class DepartmentService {
  private departmentRepo = AppDataSource.getRepository(DepartmentEntity);

  async create(dto: CreateDepartmentDto): Promise<DepartmentEntity> {
    if (dto.parentId !== undefined && dto.parentId !== null) {
      const parent = await this.departmentRepo.findOne({ where: { id: dto.parentId } });
      if (!parent) {
        throw new Error("Parent department not found");
      }
    }

    const department = this.departmentRepo.create({
      name: dto.name,
      parentId: dto.parentId,
    });
    console.log(department);
    return this.departmentRepo.save(department);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return this.departmentRepo.find({
      relations: ["children"],
      order: { id: "ASC" },
    });
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<DepartmentEntity> {
    const department = await this.departmentRepo.findOne({ where: { id } });
    if (!department) {
      throw new Error("Department not found");
    }

    if (dto.parentId === id) {
      throw new Error("Department cannot be parent of itself");
    }

    Object.assign(department, dto);
    return this.departmentRepo.save(department);
  }

  async delete(id: number): Promise<void> {
    const department = await this.departmentRepo.findOne({ where: { id } });
    if (!department) {
      throw new Error("Department not found");
    }

    await this.departmentRepo.remove(department);
  }
}
