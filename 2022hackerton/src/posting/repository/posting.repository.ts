import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import Posting from '../entity/posting.entity';

@CustomRepository(Posting)
export class PostingRepository extends Repository<Posting> {
  public getPosts(): Promise<Posting[]> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.category', 'category')
      .leftJoinAndSelect('posting.user', 'user')
      .leftJoinAndSelect('user.auth', 'auth')
      .orderBy('posting.create_at', 'DESC')
      .getMany();
  }

  public getPostByIdxWithInfo(idx: number): Promise<Posting> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.category', 'category')
      .leftJoinAndSelect('posting.user', 'user')
      .where('idx = :idx', { idx })
      .orderBy('posting.create_at', 'ASC')
      .getOne();
  }

  public getPostByMovie(movie: string): Promise<Posting[]> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.category', 'category')
      .leftJoinAndSelect('posting.user', 'user')
      .where('movie = :movie', { movie })
      .orderBy('posting.create_at', 'ASC')
      .getMany();
  }

  public getPostByCategory(category: string): Promise<Posting[]> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.category', 'category')
      .leftJoinAndSelect('posting.user', 'user')
      .leftJoinAndSelect('user.auth', 'auth')
      .where('category.category = :category', { category })
      .orderBy('posting.create_at', 'ASC')
      .getMany();
  }

  public getPostByIdx(idx: number): Promise<Posting> {
    return this.createQueryBuilder('posting')
      .where('idx = :idx', { idx })
      .orderBy('posting.create_at', 'ASC')
      .getOne();
  }
}
