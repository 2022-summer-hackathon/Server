import Auth from '../entity/auth.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {}
