import { Injectable } from '@nestjs/common';
import { ParkingSpot } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ParkingSpotsService {
  constructor(private prisma: PrismaService) {}

  async getAllSpots(): Promise<ParkingSpot[]> {
    return this.prisma.parkingSpot.findMany({
      orderBy: {
        spotNumber: 'asc',
      },
    });
  }
}
