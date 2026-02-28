import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { TokenData } from "../auth";
import { AuthService } from "./auth.service";
import LoginDto from "./auth.dto";

@injectable()
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: LoginDto = req.body;
            const tokenData: TokenData = await this.authService.login(model);
            res.status(200).json(tokenData);
        } catch (error) {
            next(error);
        }
    }


    public getCurrentLoginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const user = await this.authService.getCurrentLoginUser(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

}
