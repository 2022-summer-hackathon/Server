import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/global/decorate/repository.decorate';
import { TokenModule } from 'src/token/token.module';
import { PostingController } from './posting.controller';
import { PostingService } from './posting.service';
import { PostingRepository } from './repository/posting.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PostingRepository]),
    TokenModule,
    AuthModule,
  ],
  controllers: [PostingController],
  providers: [PostingService],
})
export class PostingModule {}
