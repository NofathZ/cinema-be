import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { TransactionService } from "./transaction.service";

@Module({
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([Transaction])
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class UserModule {}
