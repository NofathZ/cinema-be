import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/createTransaction.dto";

@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Get('transaction')
  getTranscation(@Request() req) {
    return this.transactionService.findByUsername(req);
  }

  @Post('transaction')
  setTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const result = this.transactionService.insert(createTransactionDto);
    return result;
  }
}
