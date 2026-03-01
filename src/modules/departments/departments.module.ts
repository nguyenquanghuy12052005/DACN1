import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";
import DepartmentRoute from "./department.route";

export const DepartmentsModule = {
    controllers: [DepartmentController],
    services: [DepartmentService],
    routes: [DepartmentRoute],
};
