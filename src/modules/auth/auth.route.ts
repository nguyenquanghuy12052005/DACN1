import { Router } from "express";
import { Route } from "../../core/interface";


import AuthController from "./auth.controller";
import authMiddleware from "../../core/middleware/auth.middleware";

export default class AuthRoute implements Route{
    public path ="/auth";
    public router = Router();

    public authController = new AuthController();

    constructor(){
        this.initializeRoutes();
    }

private initializeRoutes() {
  this.router.post("/", this.authController.login);
  this.router.get("/", authMiddleware, this.authController.getCurrentLoginUser);
}
}