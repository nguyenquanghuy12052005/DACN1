import { Request, Response, NextFunction } from "express";
import DepartmentService from "./department.service";

class DepartmentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await DepartmentService.create(req.body);
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
      const departments = await DepartmentService.findAll();
      res.json(departments);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await DepartmentService.update(Number(req.params.id), req.body);
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
      await DepartmentService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new DepartmentController();