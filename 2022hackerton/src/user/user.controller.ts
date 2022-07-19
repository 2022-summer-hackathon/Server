import { Body, Controller, Get } from '@nestjs/common';
import BaseResponse from 'src/global/response/baseResponse';
import User from './entity/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Body() idx: number): Promise<BaseResponse<User>> {
    const user: User = await this.userService.getUserByIdx(idx);
    return BaseResponse.successResponse('성공', user);
  }
}
