import { Controller } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';

@Controller('parking-spots')
export class ParkingSpotsController {
  constructor(private readonly parkingSpotsService: ParkingSpotsService) {}
}
