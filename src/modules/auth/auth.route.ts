import { Router } from "express";
import { Route } from "../../core/interface";
import { injectable } from "inversify";
import { AuthController } from "./auth.controller";
import authMiddleware from "../../core/middleware/auth.middleware";

@injectable()
export default class AuthRoute implements Route {
  public path = "/auth";
  public router = Router();

  constructor(public authController: AuthController) {
    this.initializeRoutes();
  }


  private initializeRoutes() {
    this.router.post("/", this.authController.login);
    this.router.get("/", authMiddleware, this.authController.getCurrentLoginUser);
  }
}
