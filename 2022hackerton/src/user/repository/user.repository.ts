import { CustomRepository } from 'src/global/decorate/custom.repository';
import { Repository } from 'typeorm';
import User from '../entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  public findUserWithAuthByIdx(idx: number): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.auth', 'auth')
      .where('idx = :idx', { idx })
      .getOne();
  }
}
