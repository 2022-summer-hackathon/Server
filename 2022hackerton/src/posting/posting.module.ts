import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/global/decorate/repository.decorate';
import { TokenModule } from 'src/token/token.module';
import { PostingController } from './posting.controller';
import { PostingService } from './posting.service';
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
    ]),
    TokenModule,
    AuthModule,
  ],
  controllers: [PostingController],
  providers: [PostingService],
})
export class PostingModule {}
