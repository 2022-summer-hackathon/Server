import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
