import { Injectable, NotFoundException } from '@nestjs/common';
import { ParkingSpot } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  AvailibiltyStatus,
  DateInfo,
  MonthAvailabilityResponse,
  SlotInfo,
} from './dto/month-availability.dto';
import { slots } from 'src/utils/generateHourlySlots';

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

    const normalizeDate = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

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

    const result: DateInfo[] = [];

    let currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
      const dateStr = currentDate.toLocaleDateString('sv-SE', {
        timeZone: 'Europe/Minsk',
      });

      const dayReservations = reservations.filter(
        (r) =>
          r.reservedDate.toLocaleDateString('sv-SE', {
            timeZone: 'Europe/Minsk',
          }) === dateStr,
      );

      const myReservation = dayReservations.some((r) => r.userId === userId);

      let status: AvailibiltyStatus;

      if (myReservation) {
        status = 'booked-by-me';
      } else if (dayReservations.length === slots.length) {
        status = 'unavailable';
      } else {
        status = 'available';
      }

      result.push({ date: dateStr, status });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log('result=', result);

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

    console.log('slotlist=', slotList);

    return slotList;
  }
}
