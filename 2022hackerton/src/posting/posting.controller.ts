import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import Auth from 'src/auth/entity/auth.entity';
import { Token } from 'src/global/decorate/token.deocorate';
import TokenGuard from 'src/global/guard/token.guard';
import BaseResponse from 'src/global/response/baseResponse';
import User from 'src/user/entity/user.entity';
import PostDto from './dto/post.dto';
import Posting from './entity/posting.entity';
import { PostingService } from './posting.service';

@Controller('/posting')
export class PostingController {
  constructor(private readonly postingService: PostingService) {}

  @UseGuards(TokenGuard)
  @Get()
  async getPost(): Promise<BaseResponse<Posting[]>> {
    const posts: Posting[] = await this.postingService.getPosts();
    return BaseResponse.successResponse('모든 게시글 조회 성공', posts);
  }

  @UseGuards(TokenGuard)
  @Get('/:idx')
  async getPostByIdx(@Param() idx: number): Promise<BaseResponse<Posting>> {
    const post: Posting = await this.postingService.getPostByIdx(idx);
    return BaseResponse.successResponse('해당 idx의 게시글 조회 성공', post);
  }

  @UseGuards(TokenGuard)
  @Get('/movie')
  async getPostByMovieTitle(
    @Body() movie: string,
  ): Promise<BaseResponse<Posting[]>> {
    const posts: Posting[] = await this.postingService.getPostsByMovie(movie);
    return BaseResponse.successResponse('영화 제목 별 조회', posts);
  }

  @UseGuards(TokenGuard)
  @Get('/page')
  async getPostByPage(
    @Query('page') page: number,
  ): Promise<BaseResponse<Posting[]>> {
    const posts: Posting[] = await this.postingService.getPostByPage(page);
    return BaseResponse.successResponse(
      '해당 페이지의 게시글 조회 성공',
      posts,
    );
  }

  @UseGuards(TokenGuard)
  @Post('/')
  async addPost(
    @Token() user: Auth,
    @Body() dto: PostDto,
  ): Promise<BaseResponse<void>> {
    await this.postingService.addPost(user, dto);
    return BaseResponse.successResponse('게시글 생성 성공');
  }

  @UseGuards(TokenGuard)
  @Put('/:idx')
  async modifyPost(
    @Token() user: Auth,
    @Body() dto: PostDto,
    @Param() idx: number,
  ): Promise<BaseResponse<void>> {
    await this.postingService.modifyPost(user, idx, dto);
    return BaseResponse.successResponse('게시글 수정 성공');
  }
}
