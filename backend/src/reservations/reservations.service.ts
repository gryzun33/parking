import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservationDto, userId: string) {
    return this.prisma.reservation.create({
      data: {
        userId,
        parkingSpotId: dto.parkingSpotId,
        reservedDate: new Date(dto.reservedDate),
        reservedTime: dto.reservedTime,
        status: 'booked',
      },
    });
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
