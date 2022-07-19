import { Body, Controller, Post, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import BaseResponse from 'src/global/response/baseResponse';
import RemakeDto from './dto/remake.dto';

@Controller('/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/verify')
  async verifyToken(
    @Query('token') accessToken: string,
  ): Promise<BaseResponse<string>> {
    const token = await this.tokenService.verifyToken(accessToken);
    return BaseResponse.successResponse('토큰을 확인하였습니다', token);
  }

  @Post('/refresh')
  async remakeAccessToken(
    @Body() dto: RemakeDto,
  ): Promise<BaseResponse<string>> {
    const token = await this.remakeAccessToken(dto);
    return BaseResponse.successResponse('토큰을 재발급하였습니다', token);
  }
}
