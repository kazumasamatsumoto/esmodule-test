import { Injectable } from '@nestjs/common';
import { CreateSymbolTransactionDto } from './dto/create-symbol-transaction.dto.js';
import { UpdateSymbolTransactionDto } from './dto/update-symbol-transaction.dto.js';
import { TextEncoder } from 'node:util';
import {
  facade,
  AlicePublicKey,
  BobAddress,
  AlicePrivateKey,
  NODE,
} from '../const/const.js';
import { models } from 'symbol-sdk/symbol';
import { KeyPair } from 'symbol-sdk/symbol';
import { PrivateKey } from 'symbol-sdk';

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

  async createTransaction() {
    const messageData = new Uint8Array([
      0x00,
      ...new TextEncoder().encode('Nest JS Hello, Symbol!'),
    ]);

    // トランザクション
    const tx = facade.transactionFactory.create({
      type: 'transfer_transaction_v1',
      signerPublicKey: AlicePublicKey,
      deadline: facade.network.fromDatetime(new Date()).addHours(2).timestamp,
      recipientAddress: BobAddress,
      mosaics: [{ mosaicId: 0x72c0212e67a08bcen, amount: 1000000n }],
      message: messageData,
    });

    tx.fee = new models.Amount(BigInt(tx.size * 100));

    console.log('トランザクションの中身を確認します。', tx);

    const keyPair = new KeyPair(new PrivateKey(AlicePrivateKey));

    const sig = facade.signTransaction(keyPair, tx);
    const jsonPayload = facade.transactionFactory.static.attachSignature(
      tx,
      sig,
    );

    // アナウンス
    const res = await fetch(new URL('/transactions', NODE), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: jsonPayload,
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });

    console.log('結果発表', res);
  }
}
