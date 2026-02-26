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

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getUserById(Number(req.params.id));  
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
      const users = await UserService.getAllUsers();
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
      const user = await UserService.updateUser(Number(req.params.id), req.body);
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
      await UserService.deleteUser(Number(req.params.id));
      res.json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

}

export default new UserController();