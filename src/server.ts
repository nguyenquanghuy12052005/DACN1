import "reflect-metadata";
import "dotenv/config";
import App from "./app";
import DepartmentRoute from "./modules/departments/department.route";

import { validateEnv } from "./core/utils";
import UserRoute from "./modules/users/user.route";
import AuthRoute from "./modules/auth/auth.route";
import ConversationRoute from "./modules/conversations/conversation.route";

validateEnv();


const routes = [
    new DepartmentRoute(),
    new UserRoute(),
    new AuthRoute(),
    new ConversationRoute(),
];

const app = new App(routes);

app.listen();

