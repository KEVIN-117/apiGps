import { Module } from '@nestjs/common';
import { GpsService } from './gps.service';
import { GpsController } from './gps.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PointGPS } from './entities/gp.entity';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{
    name: PointGPS.name,
    schema: PointGPS
  }])],
  controllers: [GpsController],
  providers: [GpsService],
})
export class GpsModule {}
