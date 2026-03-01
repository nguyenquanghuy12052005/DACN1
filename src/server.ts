import "reflect-metadata";
import "dotenv/config";
import App from "./app";
import { validateEnv } from "./core/utils";
import { container } from "./core/di/container";
import DepartmentRoute from "./modules/departments/department.route";
import UserRoute from "./modules/users/user.route";
import AuthRoute from "./modules/auth/auth.route";
import ConversationRoute from "./modules/conversations/conversation.route";

validateEnv();

const routes = [
    container.get(DepartmentRoute),
    container.get(UserRoute),
    container.get(AuthRoute),
    container.get(ConversationRoute),
];

const app = new App(routes);

app.listen();
