import { Module } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';
import { ParkingSpotsController } from './parking-spots.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ParkingSpotsController],
  providers: [ParkingSpotsService, PrismaService],
})
export class ParkingSpotsModule {}
