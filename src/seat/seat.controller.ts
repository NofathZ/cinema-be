import { Controller, Get, Post, Request } from "@nestjs/common";
import { SeatService } from "./seat.service";

@Controller()
export class SeatController {
  constructor(
    private readonly seatService: SeatService,
  ) {}

  @Get('seat')
  getSeat() {
    return this.seatService.getSeat()
  }

  @Post('seat')
  setSeat(@Request() req) {
    return this.seatService.setSeat();
  }
}
