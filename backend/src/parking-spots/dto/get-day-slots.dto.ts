import { IsDateString, IsString } from 'class-validator';

export class GetDaySlotStatusDto {
  @IsDateString()
  date: string;
}
