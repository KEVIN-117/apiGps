import "dotenv/config"
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpsModule } from './gps/gps.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [GpsModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }), MongooseModule.forRoot(process.env.DB_URL!), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
