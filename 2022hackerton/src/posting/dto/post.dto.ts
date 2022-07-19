import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import PostInfoDto from './postInfo.dto';

export default class PostDto {
  @IsString()
  @IsNotEmpty()
  movie!: string;

  @IsArray()
  @IsNotEmpty()
  postInfo: PostInfoDto[];

  @IsNumber()
  @IsNotEmpty()
  star!: number;

  @IsString()
  @IsNotEmpty()
  category!: string[];
}
