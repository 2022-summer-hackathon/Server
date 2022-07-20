import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export default class IsValidDto {
  @IsBoolean()
  @IsNotEmpty()
  isLike!: boolean;
}
