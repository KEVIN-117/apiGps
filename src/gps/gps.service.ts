import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, mongo } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PointGPS } from './entities/gp.entity';
import { CreateGpDto } from './dto/create-gp.dto';
import { create } from 'domain';

class ResponseDto {
  environment: string
  error: string
  message: string
  path: string
  statusCode: string
  result: ResultDto
}

class ResultDto {
  _id: string
  point: {
    latitud: number
    longitud: number
    _id: string
  }
  speed: number
  time: string
  deviceId: string
  accuracy: number
  direction: number
  createdAt: string
  updatedAt: string
}

@Injectable()
export class GpsService {
  private readonly logger = new Logger(GpsService.name);
  private readonly apiUrl: string;
  constructor(private readonly httpClient: HttpService, private readonly configService: ConfigService, @InjectModel(PointGPS.name) private pointGps: Model<PointGPS>) {
    this.apiUrl = this.configService.get<string>("apiUrl")!
  }

  @Cron('45 * * * * *', {
    name: "save locations"
  })
  async getPoint(): Promise<PointGPS> {
    try {
      const res = await this.httpClient.axiosRef.get<ResponseDto>(this.apiUrl)
      const data = res.data
      const location = data.result    
      console.log(location);
      
      const createdPoint = new this.pointGps(location);
      this.logger.debug('location save');
      return createdPoint.save()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      console.log(error)
      throw new Error("error")
    }
  }
}
