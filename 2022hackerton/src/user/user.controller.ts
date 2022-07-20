import { Controller, Get, UseGuards } from '@nestjs/common';
import Auth from 'src/auth/entity/auth.entity';
import { Token } from 'src/global/decorate/token.deocorate';
import TokenGuard from 'src/global/guard/token.guard';
import BaseResponse from 'src/global/response/baseResponse';
import User from './entity/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(TokenGuard)
  @Get('/')
  async getUser(@Token() user: Auth): Promise<BaseResponse<User>> {
    const userData: User = await this.userService.getUserByToken(user);
    const remainExp: number = 100 - userData.exp;
    const data = {
      userData,
      remainExp,
    };
    return BaseResponse.successResponse('성공', data);
  }
}
