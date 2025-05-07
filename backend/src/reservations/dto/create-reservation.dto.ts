import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  @IsNotEmpty()
  parkingSpotId: string;

  @IsDateString()
  @IsNotEmpty()
  reservedDate: string;

  @IsNotEmpty()
  reservedTime: string;
}
