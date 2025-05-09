import { Injectable, NotFoundException } from '@nestjs/common';
import { ParkingSpot } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  MonthAvailabilityResponse,
  SlotInfo,
} from './dto/month-availability.dto';
import { slots } from 'src/utils/generateHourlySlots';
import {
  determineAvailabilityStatus,
  formatDate,
  getMonthDates,
  normalizeDate,
} from 'src/utils/parking-utils';

@Injectable()
export class ParkingSpotsService {
  constructor(private prisma: PrismaService) {}

  async getAllSpots(): Promise<ParkingSpot[]> {
    return this.prisma.parkingSpot.findMany({
      orderBy: {
        slug: 'asc',
      },
    });
  }

  async getMonthAvailability(
    parkingSpotSlug: string,
    userId: string,
  ): Promise<MonthAvailabilityResponse> {
    const parkingSpot = await this.prisma.parkingSpot.findUnique({
      where: { slug: parkingSpotSlug },
    });

    if (!parkingSpot) {
      throw new NotFoundException('Parking spot not found');
    }

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = normalizeDate(today);
    const lastDay = normalizeDate(new Date(currentYear, currentMonth + 2, 0));

    const reservations = await this.prisma.reservation.findMany({
      where: {
        parkingSpotId: parkingSpot.id,
        reservedDate: {
          gte: firstDay,
          lte: lastDay,
        },
        status: 'booked',
      },
    });

    const result = getMonthDates(firstDay, lastDay).map((date) => {
      const status = determineAvailabilityStatus(date, reservations, userId);
      return { date: formatDate(date), status };
    });

    return { parkingSpot, monthInfo: result };
  }

  async getDaySlotStatus(
    parkingSpotSlug: string,
    date: string,
    userId: string,
  ): Promise<SlotInfo[]> {
    const parkingSpot = await this.prisma.parkingSpot.findUnique({
      where: { slug: parkingSpotSlug },
    });

    if (!parkingSpot) {
      throw new NotFoundException('Parking spot not found');
    }

    const targetDate = new Date(date);

    const dayReservations = await this.prisma.reservation.findMany({
      where: {
        parkingSpotId: parkingSpot.id,
        reservedDate: targetDate,
      },
    });

    const slotList: SlotInfo[] = slots.map((slot) => {
      const reservation = dayReservations.find(
        (r) => slot === r.reservedTime && r.status === 'booked',
      );

      return {
        slotLabel: slot,
        status: reservation ? 'booked' : 'available',
        isMine: reservation?.userId === userId,
      };
    });

    return slotList;
  }
}
