import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import Auth from 'src/auth/entity/auth.entity';
import User from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import PostDto from './dto/post.dto';
import Posting from './entity/posting.entity';
import { CategoryRepository } from './repository/category.repository';
import { LikeUserRepository } from './repository/liekUser.repository';
import { PostingRepository } from './repository/posting.repository';
import { PostingInfoRepository } from './repository/postingInfo.repository';

@Injectable()
export class PostingService {
  constructor(
    private readonly postingRepository: PostingRepository,
    private readonly postingInfoRepository: PostingInfoRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly likeUserrepository: LikeUserRepository,
    private readonly authService: AuthService,
    private readonly userServie: UserService,
  ) {}

  async getPosts(): Promise<Posting[]> {
    const postData: Posting[] = await this.postingRepository.getPosts();
    return postData;
  }

  async getPostByIdx(idx: number): Promise<Posting> {
    const postData: Posting = await this.postingRepository.getPostByIdxWithInfo(
      idx,
    );
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
    };
    const post: Posting = await this.postingRepository.save({
      user: userData.user,
      ...info,
    });
    const infoLengh: number = dto.postInfo.length;

    for (let i = 0; i < infoLengh; i++) {
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
      const info: Object = { category: dto.category[i] };
      await this.categoryRepository.save({
        posting: post,
        ...info,
      });
    }
  }

  async plusLikeCountInPost(idx: number, user: Auth): Promise<void> {
    const post: Posting = await this.postingRepository.getPostByIdx(idx);
    let count: Object = post.likeCount + 1;
    const postData: Posting = await this.postingRepository.merge(post, count);
    const savedPost = await this.postingRepository.save(postData);

    const userData: User = await this.userServie.getUserByAuth(user);
    const isLike: Object = { isLike: true };
    await this.likeUserrepository.save({
      user: userData,
      posting: savedPost,
      ...isLike,
    });
  }

  async minusLikeCountInPost(idx: number, user: Auth): Promise<void> {
    const post: Posting = await this.postingRepository.getPostByIdx(idx);
    let count: Object = post.likeCount - 1;
    const postData: Posting = await this.postingRepository.merge(post, count);
    await this.postingRepository.save(postData);

    const userData: User = await this.userServie.getUserByAuth(user);
    await this.likeUserrepository.delete(userData.idx);
  }

  async deletePost(idx: number): Promise<void> {
    await this.postingRepository.delete(idx);
  }
}
