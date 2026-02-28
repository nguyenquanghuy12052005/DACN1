import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { UserService } from "./user.service";

@injectable()
export class UserController {
  constructor(
    private userService: UserService
  ) { }


  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        message: "User retrieved successfully",
        data: user,
      });
    }
    catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.updateUser(Number(req.params.id), req.body);
      res.json({
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.deleteUser(Number(req.params.id));
      res.json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

}
