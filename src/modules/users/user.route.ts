import { Router } from "express";
import UserController from "./user.controller";

class UserRoute {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", UserController.createUser);
    this.router.get("/:id", UserController.getUserById);
    this.router.get("/", UserController.getAllUsers);
    this.router.put("/:id", UserController.updateUser);
    this.router.delete("/:id", UserController.deleteUser);
  
  }
}

export default UserRoute;