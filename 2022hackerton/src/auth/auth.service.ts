import {
  BadRequestException,
  ForbiddenException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DauthLoginDto from './dto/dauth.login.dto';
import Auth from './entity/auth.entity';
import { AuthRepository } from './repository/auth.repository';
import axios, { AxiosResponse } from 'axios';
import { TokenService } from 'src/token/token.service';
import { IloginData } from './interface/IloginData';
import User from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async getAuthById(id: string): Promise<Auth> {
    const user: Auth | undefined = await this.authRepository.findAuthById(id);
    if (user === undefined || user === null) {
      throw new NotFoundException('해당 아이디를 가진 유저가 없습니다');
    }
    return user;
  }

  async login(dto: DauthLoginDto): Promise<IloginData> {
    const DAUTH_SERVER: string = this.configService.get<string>('DAUTH_SERVER');
    const OPEN_SERVER: string = this.configService.get<string>('OPEN_SERVER');
    const CLIENT_ID: string = this.configService.get<string>('CLIENT_ID');
    const CLIENT_SECRET: string =
      this.configService.get<string>('CLIENT_SECRET');
    try {
      const res: AxiosResponse = await axios.post(
        `http://${DAUTH_SERVER}/token`,
        {
          code: dto.code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
      );
      const result: AxiosResponse = await axios.get(
        `http://${OPEN_SERVER}/user`,
        {
          headers: {
            Authorization: 'Bearer ' + res.data.access_token,
          },
        },
      );

      const userData: User = result.data.data;

      let user: Auth = await this.authRepository.findAuthById(
        result.data.data.uniqueId,
      );

      if (user === undefined || user === null) {
        const authData: Auth = await this.authRepository.create({
          id: result.data.data.uniqueId,
          name: result.data.data.name,
          accessLevel: result.data.data.accessLevel,
          profileImage: result.data.data.profileImage,
        });
        await this.authRepository.save(authData);
      }

      const token: string = await this.tokenService.generateToken(
        result.data.data.uniqueId,
      );
      const refreshToken: string = await this.tokenService.generateRefreshTokne(
        result.data.data.uniqueId,
      );
      if (
        token === undefined ||
        token === null ||
        refreshToken === undefined ||
        refreshToken == null
      ) {
        throw new ForbiddenException('토큰이 발급되지 않았습니다');
      }
      return { userData, token, refreshToken };
    } catch (error) {
      switch (error.status) {
        case 400:
          throw new BadRequestException('검증 오류 (잘못된 형식입니다)');
        case 401:
          throw new UnauthorizedException('잘못된 clientSecret입니다');
        case 403:
          throw new ForbiddenException('변조된 code입니다');
        case 410:
          throw new GoneException('토큰이 만료 되었습니다');
        case 500:
          throw new InternalServerErrorException('Open API 서버 오류');
      }
    }
  }
}
