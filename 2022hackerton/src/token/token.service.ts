import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IToken, ITokenPayload } from './interface/IToken';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  verifyToken(token: string): IToken {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new InternalServerErrorException('토큰 서버 오류');
    }
  }

  generateToken(uniqueId: string): string {
    const payload: ITokenPayload = {
      uniqueId,
    };

    const options: JwtSignOptions = {
      expiresIn: '1d',
      issuer: '2022hackerton',
      subject: 'accessToken',
    };

    return this.jwtService.sign(payload, options);
  }

  generateRefreshTokne(uniqueId: string): string {
    const payload: ITokenPayload = {
      uniqueId,
    };

    const options: JwtSignOptions = {
      expiresIn: '10d',
      issuer: '2022hackerton',
      subject: 'refreshToken',
    };
    return this.jwtService.sign(payload, options);
  }

  remakeAccessToken(token: string): string[] {
    const { iss, uniqueId, sub }: IToken = this.verifyToken(token);

    if (iss !== 'blog' || sub !== 'refreshToken') {
      throw new BadRequestException('위조된 토큰');
    }

    const accessToken = this.generateToken(uniqueId);
    const refreshToken = this.generateRefreshTokne(uniqueId);
    return [accessToken, refreshToken];
  }
}
