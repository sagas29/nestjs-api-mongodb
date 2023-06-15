import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { MongooseConfigService } from './config/mongoose.config';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './config/multer.config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
