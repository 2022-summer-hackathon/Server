import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import Auth from 'src/auth/entity/auth.entity';
import PostDto from './dto/post.dto';
import Posting from './entity/posting.entity';
import { PostingRepository } from './repository/posting.repository';
import { PostingInfoRepository } from './repository/postingInfo.repository';

@Injectable()
export class PostingService {
  constructor(
    private readonly postingRepository: PostingRepository,
    private readonly postingInfoRepository: PostingInfoRepository,
    private readonly authService: AuthService,
  ) {}

  async getPosts(): Promise<Posting[]> {
    const postData: Posting[] = await this.postingRepository.getPosts();
    return postData;
  }

  async getPostByIdx(idx: number): Promise<Posting> {
    const postData: Posting = await this.postingRepository.getPostByIdx(idx);
    if (postData === null || postData === undefined) {
      throw new NotFoundException('해당 idx를 가진 게시글은 없습니다');
    }
    return postData;
  }

  async getPostsByMovie(movie: string): Promise<Posting[]> {
    const posts: Posting[] = await this.postingRepository.getPostByMovie(movie);
    return posts;
  }

  //안쓰는거
  async getPostByPage(page: number): Promise<Posting[]> {
    const postData: Posting[] = await this.postingRepository.find({
      order: {
        idx: 'ASC',
      },
      skip: page * 5,
      take: 5,
    });
    return postData;
  }

  async addPost(user: Auth, dto: PostDto): Promise<void> {
    const userData: Auth = await this.authService.getAuthById(user.id);
    const info: Object = {
      movie: dto.movie,
      star: dto.star,
      category: dto.category,
      genre: dto.genre,
    };
    const post: Posting = await this.postingRepository.save({
      user: userData.user,
      ...info,
    });
    for (let i = 0; i < dto.text.length; i++) {
      const info: Object = {
        text: dto.text[i],
        image: dto.image[i],
      };

      console.log({ text: dto.text[i], image: dto.image[i] });

      const info2 = this.postingInfoRepository.create({
        text: dto.text[i],
        image: dto.image[i],
      });

      console.log(info2.text);

      await this.postingInfoRepository.save({
        posting: post,
        ...info,
      });
    }
  }

  async deletePost(idx: number): Promise<void> {
    await this.postingRepository.delete(idx);
  }
}
