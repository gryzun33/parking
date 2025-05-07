import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';
import { AuthGuard } from 'src/common/guards/AuthGuard';
import { User } from 'src/common/decorators/user.decorator';
import { MonthAvailabilityResponse } from './dto/month-availability.dto';

@Controller('parking-spots')
@UseGuards(AuthGuard)
export class ParkingSpotsController {
  constructor(private readonly parkingSpotsService: ParkingSpotsService) {}

  @Get()
  async getAllParkingSpots() {
    return this.parkingSpotsService.getAllSpots();
  }

  @Get(':id/available-times/month')
  async getMonthAvailability(
    @Param('id') parkingSpotId: string,
    @User('userId') userId: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ): Promise<MonthAvailabilityResponse[]> {
    return this.parkingSpotsService.getMonthAvailability(
      parkingSpotId,
      userId,
      year,
      month,
    );
  }
}
