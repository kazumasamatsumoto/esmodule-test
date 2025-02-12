import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SymbolTransactionService } from './symbol-transaction.service.js';
import { CreateSymbolTransactionDto } from './dto/create-symbol-transaction.dto.js';
import { UpdateSymbolTransactionDto } from './dto/update-symbol-transaction.dto.js';

@Controller('symbol-transaction')
export class SymbolTransactionController {
  constructor(
    private readonly symbolTransactionService: SymbolTransactionService,
  ) {}

  @Post()
  create(@Body() createSymbolTransactionDto: CreateSymbolTransactionDto) {
    return this.symbolTransactionService.create(createSymbolTransactionDto);
  }

  @Get()
  findAll() {
    return this.symbolTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.symbolTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSymbolTransactionDto: UpdateSymbolTransactionDto,
  ) {
    return this.symbolTransactionService.update(
      +id,
      updateSymbolTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.symbolTransactionService.remove(+id);
  }
}
