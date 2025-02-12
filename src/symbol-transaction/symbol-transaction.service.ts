import { Injectable } from '@nestjs/common';
import { CreateSymbolTransactionDto } from './dto/create-symbol-transaction.dto.js';
import { UpdateSymbolTransactionDto } from './dto/update-symbol-transaction.dto.js';

@Injectable()
export class SymbolTransactionService {
  create(createSymbolTransactionDto: CreateSymbolTransactionDto) {
    return 'This action adds a new symbolTransaction';
  }

  findAll() {
    return `This action returns all symbolTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} symbolTransaction`;
  }

  update(id: number, updateSymbolTransactionDto: UpdateSymbolTransactionDto) {
    return `This action updates a #${id} symbolTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} symbolTransaction`;
  }
}
