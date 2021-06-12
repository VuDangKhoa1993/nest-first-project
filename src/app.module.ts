import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { logger, LoggerMiddleware } from './middlewares/logger.middleware';
@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /*
      The configure() method can be made asynchronous using async/await 
      (e.g., you can await completion of an asynchronous operation inside 
      the configure() method body).
    */
    // apply logger middleware for /cats route handlers 
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
    // furthermore we may also apply a middleware to a particular request method 
    /* 
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: 'cats',
        method: RequestMethod.GET
      });
    */
    /* 
      consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)'
      )
      .forRoutes(CatsController);
      */

    // consumer
    //     .apply(cors(), helm(), logger).forRoutes(CatsController);
  }
}
