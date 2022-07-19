import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import Posting from '../entity/posting.entity';

@CustomRepository(Posting)
export class PostingRepository extends Repository<Posting> {
  public getPosts(): Promise<Posting[]> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.genre', 'genre')
      .getMany();
  }

  public getPostByIdx(idx: number): Promise<Posting> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.genre', 'genre')
      .where('idx = :idx', { idx })
      .getOne();
  }

  public getPostByUser(idx: number): Promise<Posting> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.user', 'user')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.genre', 'genre')
      .where('posting.idx = :idx', { idx: idx })
      .getOne();
  }

  public getPostByMovie(movie: string): Promise<Posting[]> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.postingInfo', 'postingInfo')
      .leftJoinAndSelect('posting.genre', 'genre')
      .where('movie = :movie', { movie })
      .getMany();
  }

  public getPostByGenre(genre: string): Promise<Posting[]> {
    return this.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.genre', 'genre')
      .where('genre.genre = :genre', { genre })
      .getMany();
  }
}
