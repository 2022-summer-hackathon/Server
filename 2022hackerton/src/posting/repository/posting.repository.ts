import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import Posting from '../entity/posting.entity';

@CustomRepository(Posting)
export class PostingRepository extends Repository<Posting> {
  public getPosts(): Promise<Posting[]> {
    return this.createQueryBuilder('posting').getMany();
  }

  public getPostByIdx(idx: number): Promise<Posting> {
    return this.createQueryBuilder('posting')
      .where('idx = :idx', { idx })
      .getOne();
  }

  public getPostByUser(idx: number): Promise<Posting> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.user', 'user')
      .where('posting.idx = :idx', { idx: idx })
      .getOne();
  }

  public getPostByMovie(movie: string): Promise<Posting[]> {
    return this.createQueryBuilder('posting')
      .where('movie = :movie', { movie })
      .getMany();
  }
}
