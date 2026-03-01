import { Router } from "express";
import { injectable } from "inversify";
import { UserController } from "./user.controller";

@injectable()
class UserRoute {
  public path = "/users";
  public router = Router();

  constructor(private userController: UserController) {
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
