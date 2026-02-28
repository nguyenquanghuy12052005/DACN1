import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { DepartmentService } from "./department.service";

@injectable()
export class DepartmentController {
  constructor(
    private departmentService: DepartmentService
  ) { }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await this.departmentService.create(req.body);
      res.status(201).json({
        message: "Department created successfully",
        data: department,

      });
      console.log(req.body);
    } catch (error) {
      console.log(req.body);
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await this.departmentService.findAll();
      res.json(departments);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await this.departmentService.update(Number(req.params.id), req.body);
      res.json({
        message: "Department updated successfully",
        data: department,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.departmentService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
