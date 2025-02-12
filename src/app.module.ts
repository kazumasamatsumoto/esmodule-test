import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SymbolTransactionModule } from './symbol-transaction/symbol-transaction.module.js';

@Module({
  imports: [SymbolTransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
