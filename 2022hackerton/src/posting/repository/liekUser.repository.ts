import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import LikeUser from '../entity/likeUser.entity';

@CustomRepository(LikeUser)
export class LikeUserRepository extends Repository<LikeUser> {}
