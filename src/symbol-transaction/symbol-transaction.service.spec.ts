import { Test, TestingModule } from '@nestjs/testing';
import { SymbolTransactionService } from './symbol-transaction.service.js';

describe('SymbolTransactionService', () => {
  let service: SymbolTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymbolTransactionService],
    }).compile();

    service = module.get<SymbolTransactionService>(SymbolTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
