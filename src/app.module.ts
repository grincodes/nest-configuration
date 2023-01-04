import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureService } from './feature/feature.service';
import configuration from './config/configuration';
import * as Joi from 'joi';
import { validate } from './config/custom-validation/env.validation';

@Module({
  //we can load multiple like this load: [configuration,authConfig]
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string()
      //     .valid('development', 'production', 'test', 'provision')
      //     .default('development'),
      //   PORT: Joi.number().default(3000),
      //   DB_HOST: Joi.string().required(),
      // }),
      validate,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FeatureService],
})
export class AppModule {}
