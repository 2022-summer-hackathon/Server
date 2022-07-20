import { IsNotEmpty, IsNumber } from 'class-validator';

export default class LevelUpDto {
  @IsNumber()
  @IsNotEmpty()
  exp!: number;

  @IsNumber()
  @IsNotEmpty()
  level!: number;
}
