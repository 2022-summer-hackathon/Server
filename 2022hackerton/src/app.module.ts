import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database/database.module';
import { PostingModule } from './posting/posting.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    PostingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
