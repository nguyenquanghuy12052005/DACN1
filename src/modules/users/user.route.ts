import { Router } from "express";
import { container } from "../../core/di/container";
import { UserController } from "./user.controller";

class UserRoute {
  public path = "/users";
  public router = Router();
  private userController = container.get(UserController);


  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", (req, res, next) => this.userController.createUser(req, res, next));
    this.router.get("/:id", (req, res, next) => this.userController.getUserById(req, res, next));
    this.router.get("/", (req, res, next) => this.userController.getAllUsers(req, res, next));
    this.router.put("/:id", (req, res, next) => this.userController.updateUser(req, res, next));
    this.router.delete("/:id", (req, res, next) => this.userController.deleteUser(req, res, next));

  }
}

export default UserRoute;
