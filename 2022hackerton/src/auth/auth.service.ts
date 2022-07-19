import {
  BadRequestException,
  ForbiddenException,
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
import CodeLogin from './dto/code.dto';

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

  async getCodeLogin(codeLogin: CodeLogin) {
    const DAUTH_SERVER: string = await this.configService.get<string>(
      'DAUTH_SERVER',
    );
    const clientId: string = await this.configService.get<string>('ClIENT_ID');
    const redirectUrl: string = await this.configService.get<string>(
      'redirectUrl',
    );
    try {
      const res: AxiosResponse = await axios.post(
        `http://${DAUTH_SERVER}/api/auth/login`,
        {
          id: codeLogin.id,
          pw: codeLogin.pw,
          clientId: clientId,
          redirectUrl: redirectUrl,
        },
      );
      const code: string = res.data.data.location.split('=')[1].split('&')[0];
      return code;
    } catch (error) {
      switch (error.status) {
        case 400:
          throw new BadRequestException('Bad request');
        case 401:
          throw new UnauthorizedException('Unauthorization');
        case 404:
          throw new NotFoundException('NotFound');
      }
    }
  }

  async login(code: string): Promise<IloginData> {
    const DAUTH_SERVER: string = await this.configService.get<string>(
      'DAUTH_SERVER',
    );
    const OPEN_SERVER: string = await this.configService.get<string>(
      'OPEN_SERVER',
    );

    try {
      const res: AxiosResponse = await axios.post(
        `http://${DAUTH_SERVER}/api/token`,
        {
          code: code,
          client_id: this.configService.get<string>('ClIENT_ID'),
          client_secret: this.configService.get<string>('ClIENT_SECRET'),
        },
      );
      const result: AxiosResponse = await axios.get(
        `http://${OPEN_SERVER}/api/user`,
        {
          headers: {
            Authorization: 'Bearer ' + res.data.access_token,
          },
        },
      );

      const userData: Auth = result.data.data;

      let user: Auth | undefined = await this.authRepository.findAuthById(
        result.data.data.uniqueId,
      );

      if (user === undefined || user === null) {
        user = this.authRepository.create({
          id: result.data.data.uniqueId,
          name: result.data.data.name,
          accessLevel: result.data.data.accessLevel,
          profileImage: result.data.data.profileImage,
        });
        await this.authRepository.save(user);
      }

      const token: string = await this.tokenService.generateToken(
        result.data.data.uniqueId,
      );
      const refreshToken: string = await this.tokenService.generateRefreshTokne(
        result.data.data.uniqueId,
      );
      if (
        token === undefined ||
        refreshToken === undefined ||
        token === null ||
        token === null
      ) {
        throw new ForbiddenException('토큰이 발급되지 않았습니다');
      }
      return { userData, token, refreshToken };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('서버 오류');
    }
  }
}
