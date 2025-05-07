import { Module } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';
import { ParkingSpotsController } from './parking-spots.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [ParkingSpotsController],
  providers: [ParkingSpotsService, PrismaService],
})
export class ParkingSpotsModule {}
