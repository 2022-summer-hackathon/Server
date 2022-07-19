import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import Auth from 'src/auth/entity/auth.entity';
import User from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import PostDto from './dto/post.dto';
import Posting from './entity/posting.entity';
import { PostingRepository } from './repository/posting.repository';

@Injectable()
export class PostingService {
  constructor(
    private readonly postingRepository: PostingRepository,
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
    const post: Posting = await this.postingRepository.create({
      user: userData.user,
      ...dto,
    });
    await this.postingRepository.save(post);
  }

  async modifyPost(user: Auth, idx: any, dto: PostDto): Promise<void> {
    const checkPost: Posting = await this.postingRepository.getPostByUser(
      idx.idx,
    );
    if (checkPost === null || checkPost === undefined) {
      throw new NotFoundException('해당 게시글이 없습니다');
    }
    const userData: Auth = await this.authService.getAuthById(user.id);
    if (checkPost.user.idx !== userData.user.idx) {
      throw new ForbiddenException('자신의 게시글만 수정할 수 있습니다');
    }
    const postData: Posting = await this.postingRepository.merge(
      checkPost,
      dto,
    );
    await this.postingRepository.save(postData);
  }

  async deletePost(idx: number): Promise<void> {
    await this.postingRepository.delete(idx);
  }
}
