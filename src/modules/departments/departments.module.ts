import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";

export const DepartmentsModule = {
    controllers: [DepartmentController],
    services: [DepartmentService],
};
