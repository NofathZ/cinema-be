import { Controller, Get } from "@nestjs/common";
import { TicketService } from "./ticket.service";

@Controller()
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
  ) {}

  @Get('ticket')
  getTicket() {
    return this.ticketService.getTicket();
  }
}
