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
  }
}

export default UserRoute;