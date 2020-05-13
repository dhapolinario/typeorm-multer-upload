import { parse } from 'fast-csv';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../configs/upload';
import AppError from '../errors/AppError';
import CreateTransactionService from './CreateTransactionService';

import Transaction from '../models/Transaction';

class ImportTransactionsService {
  async execute(transactionsFilename: string): Promise<Transaction[]> {
    const transactionsFilePath = path.join(
      uploadConfig.directory,
      transactionsFilename,
    );

    const userAvatarFileExists = await fs.promises.stat(transactionsFilePath);

    if (!userAvatarFileExists) {
      throw new AppError('File not found.', 404);
    }

    const createTransaction = new CreateTransactionService();

    const transactions: Transaction[] = [];

    const readStream = fs
      .createReadStream(transactionsFilePath)
      .pipe(parse({ headers: true, ltrim: true, rtrim: true }));

    for await (const row of readStream) {
      const transaction = await createTransaction.execute(row);
      transactions.push(transaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
