import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AccountController } from './account/account.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AccountController],
  providers: [AppService],
})
export class AppModule {}
