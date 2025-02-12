import { Module } from '@nestjs/common';
import { SymbolTransactionService } from './symbol-transaction.service.js';
import { SymbolTransactionController } from './symbol-transaction.controller.js';

@Module({
  controllers: [SymbolTransactionController],
  providers: [SymbolTransactionService],
})
export class SymbolTransactionModule {}
