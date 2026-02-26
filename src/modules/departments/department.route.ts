import { Router } from "express";
import DepartmentController from "./department.controller";

class DepartmentRoute {
  public path = "/departments";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", DepartmentController.create);
    this.router.get("/", DepartmentController.getAll);
    this.router.put("/:id", DepartmentController.update);
    this.router.delete("/:id", DepartmentController.delete);
  }
}

export default DepartmentRoute;