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
import { GetDaySlotStatusDto } from './dto/get-day-slots.dto';

@Controller('parking-spots')
@UseGuards(AuthGuard)
export class ParkingSpotsController {
  constructor(private readonly parkingSpotsService: ParkingSpotsService) {}

  @Get()
  async getAllParkingSpots() {
    return this.parkingSpotsService.getAllSpots();
  }

  @Get(':slug/available-times/month')
  async getMonthAvailability(
    @Param('slug') parkingSpotSlug: string,
    @User('userId') userId: string,
  ): Promise<MonthAvailabilityResponse> {
    return this.parkingSpotsService.getMonthAvailability(
      parkingSpotSlug,
      userId,
    );
  }

  @Get(':slug/available-times/day')
  async getDaySlotStatus(
    @Param('slug') parkingSpotSlug: string,
    @User('userId') userId: string,
    @Query() query: GetDaySlotStatusDto,
  ) {
    const { date } = query;

    const slots = await this.parkingSpotsService.getDaySlotStatus(
      parkingSpotSlug,
      date,
      userId,
    );

    return slots;
  }
}
