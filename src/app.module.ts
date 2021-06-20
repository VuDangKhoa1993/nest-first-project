import { ConfigService } from './shared/services/config/config.service';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { logger, LoggerMiddleware } from './middlewares/logger.middleware';
import { RoleGuard } from './shared/guards/role.guard';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { CatsService } from './cats/cats.service';
import process from 'process';
import { DevelopmentConfigService } from './shared/services/development-config/development-config.service';
import { ProductionConfigService } from './shared/services/production-config/production-config.service';
import { OptionsProviderService } from './shared/services/options-provider/options-provider.service';
import { LoggerService } from './shared/services/logger/logger.service';

const createConnection = (options: any) => {
  return true;
} 

const devConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [],
  synchronize: true,
  env: 'development'
};

const prodCongig = {
  type: 'sql',
  host: 'localhost',
  port: 8080,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [],
  synchronize: false,
  env: 'production'
};

class DatabaseConnection {
  constructor(options?: any) { }
};

const configServiceProvider = {
  provide: ConfigService,
  useClass: process.env.NODE_ENV === 'development'
    ? DevelopmentConfigService : ProductionConfigService
};

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProviderService) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProviderService]
};

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService
};

const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? devConfig : prodCongig;
  }
};

const asyncConnection = {
  provide: 'ASYNC_CONNECTION',
  useFactory: async (optionsProvider: OptionsProviderService) => {
    const options = optionsProvider.get();
    const connection = await createConnection(options);
    return connection;
  },
  inject: [OptionsProviderService]
}
 @Module({
  imports: [CatsModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: CatsService,
      useClass: CatsService
    },
    // CatsService,
    // {
    //   provide: 'CONNECTION',
    //   useValue: Connection
    // },
    configServiceProvider,
    connectionFactory,
    LoggerService,
    loggerAliasProvider,
    configFactory,
    asyncConnection
  ],
  exports: [
    'CONNECTION', //export a custom provider using its token to other modules
    configServiceProvider // export a custom provider using the full provider object to other modules.
  ] 
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
