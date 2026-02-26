import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();