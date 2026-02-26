import bcrypt from "bcryptjs";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dtos/user.dto"; 
import { AppDataSource } from "../../core/database/postgreSQL";

class UserService {
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
}

export default new UserService();