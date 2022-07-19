import { IsNotEmpty, IsString } from 'class-validator';

export default class PostDto {
  @IsString()
  @IsNotEmpty()
  movie!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;
}
