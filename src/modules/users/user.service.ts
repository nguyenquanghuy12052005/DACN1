import { injectable } from "inversify";
import bcrypt from "bcryptjs";
import { UserEntity } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "./dtos/user.dto";
import { AppDataSource } from "../../core/database/postgreSQL";

@injectable()
export class UserService {
  private userRepo = AppDataSource.getRepository(UserEntity);

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const existed = await this.userRepo.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (existed) {
      throw new Error("Username or email already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
      phone: dto.phone,
      avatar: dto.avatar,
      departmentId: dto.departmentId,
      positionId: dto.positionId,
    });

    return this.userRepo.save(user);
  }


  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepo.findOneBy({ id });
  }


  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepo.find({
      order: {
        createdAt: "DESC", // nếu có cột createdAt
      },
    });
  }

  async updateUser(id: number, dto: Partial<UpdateUserDto>): Promise<UserEntity> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (typeof dto.password === "string" && dto.password.trim() !== "") {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, {
      username: dto.username ?? user.username,
      email: dto.email ?? user.email,
      phone: dto.phone ?? user.phone,
      avatar: dto.avatar ?? user.avatar,
      departmentId: dto.departmentId ?? user.departmentId,
      positionId: dto.positionId ?? user.positionId,
      status: dto.status ?? user.status,
    });

    return this.userRepo.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepo.remove(user);
  }
}
