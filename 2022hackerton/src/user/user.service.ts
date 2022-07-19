import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import Auth from 'src/auth/entity/auth.entity';
import User from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async getUserByIdx(idx: number) {
    return this.userRepository.findUserWithAuthByIdx(idx);
  }

  async getUserByToken(user: Auth): Promise<User> {
    const auth: Auth = await this.authService.getAuthById(user.id);
    const userData = await this.userRepository.findUserWithAuthByIdx(
      auth.user.idx,
    );
    return userData;
  }
}
