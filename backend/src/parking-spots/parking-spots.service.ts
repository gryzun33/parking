import { Injectable, NotFoundException } from '@nestjs/common';
import { ParkingSpot } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  AvailibiltyStatus,
  DateInfo,
  MonthAvailabilityResponse,
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
    year: number,
    month: number,
  ): Promise<MonthAvailabilityResponse> {
    const parkingSpot = await this.prisma.parkingSpot.findUnique({
      where: { slug: parkingSpotSlug },
    });

    // console.log('parkingspot=', parkingSpot);

    if (!parkingSpot) {
      throw new NotFoundException('Parking spot not found');
    }

    const today = new Date();

    const isCurrentMonth = month === today.getMonth();

    // console.log('iscurrentmonth=', isCurrentMonth);

    const firstDay = isCurrentMonth ? today : new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

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

    const startDay = isCurrentMonth ? today.getDate() : 1;

    // console.log('startDate=', startDay);

    for (let day = startDay; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      // console.log('currentDate=', currentDate);
      const dateStr = currentDate.toLocaleDateString('sv-SE', {
        timeZone: 'Europe/Minsk',
      });
      // console.log('dateStr=', dateStr);
      const dayReservations = reservations.filter(
        (r) => r.reservedDate.getDate() === day,
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
    }

    return { parkingSpot, monthInfo: result };
  }
}
