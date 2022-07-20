import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CountingDto {
  @IsNumber()
  @IsNotEmpty()
  likeCount!: number;
}
