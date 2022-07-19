import Auth from '../entity/auth.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';

@CustomRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  public findAuthById(id: string): Promise<Auth> {
    return this.createQueryBuilder('auth').where('id = :id', { id }).getOne();
  }
}
