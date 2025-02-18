import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import Auth from 'src/auth/entity/auth.entity';
import { multerDiskOptions } from 'src/config/multer/multer.option';
import { Token } from 'src/global/decorate/token.deocorate';
import TokenGuard from 'src/global/guard/token.guard';
import BaseResponse from 'src/global/response/baseResponse';
import PostDto from './dto/post.dto';
import Posting from './entity/posting.entity';
import { PostingService } from './posting.service';

@Controller('/posting')
export class PostingController {
  constructor(
    private readonly postingService: PostingService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(TokenGuard)
  @Get('/')
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
  @Get('/movie/category/:category')
  async getPostBycategory(
    @Param('category') category: string,
  ): Promise<BaseResponse<Posting>> {
    if (category == '전체') {
      const posts: Posting[] = await this.postingService.getPosts();
      return BaseResponse.successResponse(
        '해당 장르의 게시글 조회 성공',
        posts,
      );
    }
    const posts: Posting[] = await this.postingService.getPostByCategory(
      category,
    );
    return BaseResponse.successResponse('해당 장르의 게시글 조회 성공', posts);
  }

  @UseGuards(TokenGuard)
  @Get('/movie/title')
  async getPostByMovieTitle(
    @Body() movie: any,
  ): Promise<BaseResponse<Posting[]>> {
    const posts: Posting[] = await this.postingService.getPostsByMovie(
      movie.movie,
    );
    return BaseResponse.successResponse('영화 제목 별 조회', posts);
  }

  @UseGuards(TokenGuard)
  @Get('/moive/page')
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
  @Post('/plus/:idx')
  async plusLikeCount(
    @Token() user: Auth,
    @Param('idx') idx: number,
  ): Promise<BaseResponse<void>> {
    await this.postingService.plusLikeCountInPost(idx, user);
    return BaseResponse.successResponse('성공');
  }

  @UseGuards(TokenGuard)
  @Post('/minus/:idx')
  async minusLikeCount(
    @Token() user: Auth,
    @Param('idx') idx: number,
  ): Promise<BaseResponse<void>> {
    await this.postingService.minusLikeCountInPost(idx, user);
    return BaseResponse.successResponse('성공');
  }

  @Post('/image')
  @UseInterceptors(FileInterceptor('image', multerDiskOptions))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResponse<string>> {
    const port: string = await this.configService.get<string>('PORT');
    return BaseResponse.successResponse(
      '사진 업로드 성공',
      `http://192.168.220.35:${port}/${file.path}`,
    );
  }
}
