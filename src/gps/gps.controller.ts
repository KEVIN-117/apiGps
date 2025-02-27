import { Controller, Get } from '@nestjs/common';
import { GpsService } from './gps.service';

@Controller('gps')
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @Get()
  async getGpsPoint() {
    return await this.gpsService.getPoint()
  }
}
