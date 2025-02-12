import { PartialType } from '@nestjs/mapped-types';
import { CreateSymbolTransactionDto } from './create-symbol-transaction.dto.js';

export class UpdateSymbolTransactionDto extends PartialType(
  CreateSymbolTransactionDto,
) {}
