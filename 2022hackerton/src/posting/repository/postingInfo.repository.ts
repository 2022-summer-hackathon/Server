import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import PostingInfo from '../entity/postingInfo.entity';

@CustomRepository(PostingInfo)
export class PostingInfoRepository extends Repository<PostingInfo> {}
