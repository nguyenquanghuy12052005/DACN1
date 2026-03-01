import { Router } from "express";
import { injectable } from "inversify";
import { DepartmentController } from "./department.controller";

@injectable()
class DepartmentRoute {
  public path = "/departments";
  public router = Router();

  constructor(private departmentController: DepartmentController) {
    this.initializeRoutes();
  }


  private initializeRoutes() {
    this.router.post("/", (req, res, next) => this.departmentController.create(req, res, next));
    this.router.get("/", (req, res, next) => this.departmentController.getAll(req, res, next));
    this.router.put("/:id", (req, res, next) => this.departmentController.update(req, res, next));
    this.router.delete("/:id", (req, res, next) => this.departmentController.delete(req, res, next));
  }
}

export default DepartmentRoute;
