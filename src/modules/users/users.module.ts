import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export const UsersModule = {
    controllers: [UserController],
    services: [UserService],
};
