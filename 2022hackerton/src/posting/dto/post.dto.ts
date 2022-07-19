import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class PostDto {
  @IsString()
  @IsNotEmpty()
  movie!: string;

  @IsArray()
  @IsNotEmpty()
  text!: string[];

  @IsArray()
  @IsNotEmpty()
  image!: string[];

  @IsNumber()
  @IsNotEmpty()
  star!: number;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  genre!: string;
}
