import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/global/decorate/repository.decorate';
import { PostingController } from './posting.controller';
import { PostingService } from './posting.service';
import { PostingRepository } from './repository/posting.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PostingRepository])],
  controllers: [PostingController],
  providers: [PostingService],
})
export class PostingModule {}
