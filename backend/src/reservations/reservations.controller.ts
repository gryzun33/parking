import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AuthGuard } from 'src/common/guards/AuthGuard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() dto: CreateReservationDto, @User('userId') userId: string) {
    return this.reservationsService.create(dto, userId);
  }

  @Get('/me')
  findUserReservations(@User('userId') userId: string) {
    return this.reservationsService.findByUser(userId);
  }

  @Patch(':id')
  cancelReservation(
    @Param('id') reservationId: string,
    @User('userId') userId: string,
  ) {
    return this.reservationsService.cancel(reservationId, userId);
  }
}
