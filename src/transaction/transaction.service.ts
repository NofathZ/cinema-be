import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/createTransaction.dto';

Injectable();
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) { }

  async findByUsername(username: string) {
  }

  async insert(createTransactionDto: CreateTransactionDto) {
    
  }
}
