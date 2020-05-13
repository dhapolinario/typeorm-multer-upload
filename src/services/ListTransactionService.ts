// import { response } from 'express';
// import TransactionsRepository from '../repositories/TransactionsRepository';
import { getRepository } from 'typeorm';
import GetTransactionBalanceService from './GetTransactionBalanceService';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;

  outcome: number;

  total: number;
}

interface TransactionAndBalance {
  transactions: Transaction[];

  balance: Balance;
}

class ListTransactionService {
  public async execute(): Promise<TransactionAndBalance> {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    const getTransactionBalanceService = new GetTransactionBalanceService(
      transactions,
    );

    const balance = getTransactionBalanceService.execute();

    const transactionsAndBalance = {
      transactions,
      balance,
    };

    return transactionsAndBalance;
  }
}

export default ListTransactionService;
