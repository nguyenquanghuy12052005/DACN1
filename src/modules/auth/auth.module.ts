import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import AuthRoute from "./auth.route";

export const AuthModule = {
    controllers: [AuthController],
    services: [AuthService],
    routes: [AuthRoute],
};
