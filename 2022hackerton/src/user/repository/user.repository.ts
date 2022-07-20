import { CustomRepository } from 'src/global/decorate/custom.repository';
import { Repository } from 'typeorm';
import User from '../entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  public findUserWithAuthByIdx(idx: number): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.auth', 'auth')
      .leftJoinAndSelect('user.posting', 'posting')
      .where('user.idx = :idx', { idx })
      .getOne();
  }

  public findUser(idx: number): Promise<User> {
    return this.createQueryBuilder('user')
      .where('idx = :idx', { idx })
      .getOne();
  }

  public findUserByAuthId(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.auth', 'auth')
      .where('auth.id = :id', { id })
      .getOne();
  }
}
