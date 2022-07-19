import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import Auth from 'src/auth/entity/auth.entity';
import PostDto from './dto/post.dto';
import Posting from './entity/posting.entity';
import { CategoryRepository } from './repository/category.repository';
import { PostingRepository } from './repository/posting.repository';
import { PostingInfoRepository } from './repository/postingInfo.repository';

@Injectable()
export class PostingService {
  constructor(
    private readonly postingRepository: PostingRepository,
    private readonly postingInfoRepository: PostingInfoRepository,
    private readonly categoryRepository: CategoryRepository,
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

  async getPostByCategory(category: string): Promise<Posting[]> {
    const posts: Posting[] = await this.postingRepository.getPostByCategory(
      category,
    );
    return posts;
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
    };
    const post: Posting = await this.postingRepository.save({
      user: userData.user,
      ...info,
    });
    for (let i = 0; i < dto.postInfo[i].text.length; i++) {
      const info: Object = {
        text: dto.postInfo[i].text,
        image: dto.postInfo[i].image,
      };
      await this.postingInfoRepository.save({
        posting: post,
        ...info,
      });
    }
    for (let i = 0; i < dto.category.length; i++) {
      const category: Object = { category: dto.category[i] };
      await this.categoryRepository.save({
        posting: post,
        ...category,
      });
    }
  }

  async deletePost(idx: number): Promise<void> {
    await this.postingRepository.delete(idx);
  }
}
