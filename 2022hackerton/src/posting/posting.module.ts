import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/global/decorate/repository.decorate';
import { TokenModule } from 'src/token/token.module';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { PostingController } from './posting.controller';
import { PostingService } from './posting.service';
import { CategoryRepository } from './repository/category.repository';
import { LikeUserRepository } from './repository/liekUser.repository';
import { PostingRepository } from './repository/posting.repository';
import { PostingInfoRepository } from './repository/postingInfo.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmExModule.forCustomRepository([
      PostingRepository,
      PostingInfoRepository,
      CategoryRepository,
      LikeUserRepository,
      UserRepository,
    ]),
    TokenModule,
    AuthModule,
    UserModule,
  ],
  controllers: [PostingController],
  providers: [PostingService],
})
export class PostingModule {}
