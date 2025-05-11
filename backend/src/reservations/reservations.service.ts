import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { formatDate } from 'src/utils/parking-utils';
import { UserReservationResponse } from './dto/user-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservationDto, userId: string) {
    const { parkingSpotId, reservedDate, reservedTimes } = dto;

    const result = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.reservation.findMany({
        where: {
          parkingSpotId,
          reservedDate: new Date(reservedDate),
          reservedTime: { in: reservedTimes },
          status: 'booked',
        },
      });

      if (existing.length > 0) {
        throw new ConflictException(
          'Один или несколько слотов уже заняты, попробуйте перезагрузить страницу',
        );
      }

      return tx.reservation.createMany({
        data: reservedTimes.map((time) => ({
          userId,
          parkingSpotId,
          reservedDate: new Date(reservedDate),
          reservedTime: time,
          status: 'booked',
        })),
      });
    });

    return result;
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

    const result: UserReservationResponse[] = sorted.map((item) => ({
      id: item.id,
      userId: item.userId,
      parkingSpotId: item.parkingSpotId,
      reservedDate: formatDate(item.reservedDateObj),
      reservedTime: item.reservedTime,
      status: item.status,
      spotSlug: item.spotSlug,
      location: item.location,
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
