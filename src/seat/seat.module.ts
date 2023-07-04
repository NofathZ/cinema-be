import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';

@Module({
  imports: [],
  providers: [SeatService],
  exports: [SeatService],
})
export class SeatModule {}
