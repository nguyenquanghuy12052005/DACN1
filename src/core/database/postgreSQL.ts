// core/database/postgreSQL.ts
import { DataSource } from "typeorm";
import { DepartmentEntity } from "../../modules/departments/department.entity";
import { Logger } from "../utils";
import "dotenv/config";
import { UserEntity } from "../../modules/users/user.entity";
import { PositionEntity } from "../../modules/users/positions.entity";
import { UserWalletEntity } from "../../modules/users/user_walets.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    DepartmentEntity,
    UserEntity,
    PositionEntity,
    UserWalletEntity
  ],
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOGGING === "true",
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    Logger.info("PostgreSQL connected successfully!");
  } catch (error) {
    Logger.error(" PostgreSQL connection failed", error);
    process.exit(1);
  }
};