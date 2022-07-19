import { Body, Controller, Post } from '@nestjs/common';
import BaseResponse from 'src/global/response/baseResponse';
import { AuthService } from './auth.service';
import DauthLoginDto from './dto/dauth.login.dto';
import { IloginData } from './interface/IloginData';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async getCodeLogin(@Body() dto: DauthLoginDto) {
    const data: IloginData = await this.authService.login(dto);
    return BaseResponse.successResponse('Dauth 로그인 성공');
  }
}
