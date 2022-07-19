import { IsNotEmpty, IsString } from 'class-validator';

export default class DauthLoginDto {
  @IsString()
  @IsNotEmpty()
  code!: string;
}
