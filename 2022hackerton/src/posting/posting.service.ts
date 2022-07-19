import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import Auth from 'src/auth/entity/auth.entity';
import User from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/user.service';
import CountingDto from './dto/counting.dto';
import IsValidDto from './dto/isValid.dto';
import PostDto from './dto/post.dto';
import LikeUser from './entity/likeUser.entity';
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
    private readonly likeUserRepository: LikeUserRepository,
    private readonly userRepository: UserRepository,
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
    if (post === undefined || post === null) {
      throw new NotFoundException('해당 게시글이 없습니다');
    }
    const count: number = await this.likeUserRepository.getLikeUserCount();
    const dto: CountingDto = {
      likeCount: count + 1,
    };

    const postData: Posting = await this.postingRepository.merge(post, dto);
    const savePost: Posting = await this.postingRepository.save(postData);

    const isLike: IsValidDto = { isLike: true };
    await this.likeUserRepository.save({
      ...isLike,
      posting: savePost,
      user: user,
    });
  }

  async minusLikeCountInPost(idx: number, user: Auth): Promise<void> {
    const post: Posting = await this.postingRepository.getPostByIdx(idx);
    if (post === undefined || post === null) {
      throw new NotFoundException('해당 게시글이 없습니다');
    }
    const count: number = await this.likeUserRepository.getLikeUserCount();
    const dto: CountingDto = {
      likeCount: count - 1,
    };

    const postData: Posting = await this.postingRepository.merge(post, dto);
    const savePost: Posting = await this.postingRepository.save(postData);

    const isLike: IsValidDto = { isLike: false };
    await this.likeUserRepository.save({
      ...isLike,
      posting: savePost,
      user: user,
    });
  }
}
