import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

// 传递数组防止默认值绕过Joi的校验
const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`, '.env'];

@Module({
  imports: [
    ConfigModule.forRoot({
      // 这样可以不用在每个模块单独引入
      isGlobal: true,
      envFilePath,
      // 把公共的部分写在.env中
      load: [() => dotenv.config({ path: '.env' })],
      // 校验配置参数格式，同样也可以设置默认值
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB: Joi.string(),
        DB_HOST: Joi.string().ip(),
        DB_DOMAIN: Joi.string(),
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
