import { Container } from "inversify";
import { AuthModule } from "../../modules/auth/auth.module";
import { ConversationsModule } from "../../modules/conversations/conversations.module";
import { DepartmentsModule } from "../../modules/departments/departments.module";
import { UsersModule } from "../../modules/users/users.module";

const container = new Container();

const modules = [
  AuthModule,
  ConversationsModule,
  DepartmentsModule,
  UsersModule,
];

modules.forEach((module) => {
  if (module.services) {
    module.services.forEach((service: any) => {
      container.bind(service).toSelf();
    });
  }
  if (module.controllers) {
    module.controllers.forEach((controller: any) => {
      container.bind(controller).toSelf();
    });
  }
});

export { container };
