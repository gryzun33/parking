import { IsDateString } from 'class-validator';

export class GetDaySlotStatusDto {
  @IsDateString()
  date: string;
}
