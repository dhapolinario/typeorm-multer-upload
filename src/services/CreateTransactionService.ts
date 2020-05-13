// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ListTransactionService from './ListTransactionService';
import FindOrCreateCategoryByTitleService from './FindOrCreateCategoryByTitleService';

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category: categoryTitle,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);

    const listTransactionService = new ListTransactionService();

    const transactionsAndBalance = await listTransactionService.execute();

    if (
      type === 'outcome' &&
      transactionsAndBalance.balance.total - value < 0
    ) {
      throw new AppError('There is not enough balance in the account.', 400);
    }

    const findOrCreateCategoryByTitle = new FindOrCreateCategoryByTitleService();
    const category = await findOrCreateCategoryByTitle.execute(categoryTitle);

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
