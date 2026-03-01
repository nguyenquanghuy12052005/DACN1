import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import UserRoute from "./user.route";

export const UsersModule = {
    controllers: [UserController],
    services: [UserService],
    routes: [UserRoute],
};
