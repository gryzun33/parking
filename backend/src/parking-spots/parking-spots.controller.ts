import { Controller, Get, UseGuards } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';
import { AuthGuard } from 'src/common/guards/AuthGuard';

@Controller('parking-spots')
@UseGuards(AuthGuard)
export class ParkingSpotsController {
  constructor(private readonly parkingSpotsService: ParkingSpotsService) {}

  @Get()
  async getAllParkingSpots() {
    return this.parkingSpotsService.getAllSpots();
  }
}
