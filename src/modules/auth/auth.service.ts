import { injectable } from 'inversify';
import { httpException } from '../../core/exceptions';
import { isEmptyObj } from '../../core/utils';
import { DataStoredInToken, IUser, TokenData } from '../auth';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginDto from './auth.dto';
import { UserEntity } from '../users/user.entity';
import { AppDataSource } from '../../core/database/postgreSQL';

@injectable()
export class AuthService {
  private userRepository = AppDataSource.getRepository(UserEntity);

  public async login(model: LoginDto): Promise<TokenData> {
    if (isEmptyObj(model)) {
      throw new httpException(400, 'Body đăng nhập rỗng');
    }

    const user = await this.userRepository.findOne({ where: { email: model.email } });
    if (!user) {
      throw new httpException(409, `Email không tồn tại: ${model.email}`);
    }

    const isMatchPassword = await bcryptjs.compare(model.password, user.passwordHash!);
    if (!isMatchPassword) {
      throw new httpException(400, 'Sai mật khẩu');
    }

    return this.createToken(user);
  }

  public async getCurrentLoginUser(userId: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { id: parseInt(userId, 10) } });
    if (!user) {
      throw new httpException(404, 'User không tồn tại');
    }
    return user;
  }



  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoredInToken = { id: user.id.toString() };
    const secret: string = process.env.JWT_SECRET!;
    const expiresIn = 259200; // 3 ngày

    return {
      token: jwt.sign(dataInToken, secret, { expiresIn }),
    };
  }
}
