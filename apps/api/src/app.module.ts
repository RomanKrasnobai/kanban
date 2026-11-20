import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {baseDataSourceOptions} from "./database/database.config";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          ...baseDataSourceOptions(),
          autoLoadEntities: true,
        }),
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
