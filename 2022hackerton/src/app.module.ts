import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [DatabaseModule, TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
