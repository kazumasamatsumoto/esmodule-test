import { Test, TestingModule } from '@nestjs/testing';
import { SymbolTransactionController } from './symbol-transaction.controller.js';
import { SymbolTransactionService } from './symbol-transaction.service.js';

describe('SymbolTransactionController', () => {
  let controller: SymbolTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymbolTransactionController],
      providers: [SymbolTransactionService],
    }).compile();

    controller = module.get<SymbolTransactionController>(
      SymbolTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
