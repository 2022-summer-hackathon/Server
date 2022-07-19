import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByIdx(idx: number) {
    return this.userRepository.findUserWithAuthByIdx(idx);
  }
}
