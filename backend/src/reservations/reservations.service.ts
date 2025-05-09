import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservationDto, userId: string) {
    const { parkingSpotId, reservedDate, reservedTimes } = dto;

    const createdReservations = await Promise.all(
      reservedTimes.map((time) =>
        this.prisma.reservation.create({
          data: {
            userId,
            parkingSpotId,
            reservedDate: new Date(reservedDate),
            reservedTime: time,
            status: 'booked',
          },
        }),
      ),
    );

    return createdReservations;
  }

  async findByUser(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId },
      orderBy: { reservedDate: 'desc' },
    });
  }

  async cancel(reservationId: string, userId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation || reservation.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.reservation.update({
      where: { id: reservationId },
      data: { status: 'cancelled' },
    });
  }
}
