import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import Posting from '../entity/posting.entity';

@CustomRepository(Posting)
export class PostingRepository extends Repository<Posting> {}
