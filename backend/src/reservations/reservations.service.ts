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
  async findByUser(userId: string): Promise<UserReservationResponse[]> {
    const reservations = await this.prisma.reservation.findMany({
      where: { userId },
      include: {
        parkingSpot: {
          select: {
            slug: true,
            location: true,
          },
        },
      },
    });

    const parsed = reservations.map((reservation) => {
      const startHour = parseInt(
        reservation.reservedTime.split(' - ')[0].split('.')[0] || '0',
        10,
      );

      return {
        ...reservation,
        reservedDateObj: reservation.reservedDate,
        startHour,
        spotSlug: reservation.parkingSpot.slug,
        location: reservation.parkingSpot.location,
      };
    });

    const sorted = parsed.sort((a, b) => {
      const dateCompare =
        b.reservedDateObj.getTime() - a.reservedDateObj.getTime();
      if (dateCompare !== 0) return dateCompare;
      return b.startHour - a.startHour;
    });

    const result = sorted.map(({ reservedDateObj, startHour, ...rest }) => ({
      ...rest,
      reservedDate: reservedDateObj.toLocaleDateString('sv-SE', {
        timeZone: 'Europe/Minsk',
      }),
    }));

    return result;
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
