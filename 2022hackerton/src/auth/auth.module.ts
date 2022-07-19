import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/global/decorate/repository.decorate';
import { TokenModule } from 'src/token/token.module';
import { UserRepository } from 'src/user/repository/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([AuthRepository, UserRepository]),
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
