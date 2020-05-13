import Transaction from '../models/Transaction';
import TransactionsBalance from '../models/TransactionsBalance';

class GetTransactionBalanceService {
  private transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  public execute(): TransactionsBalance {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.forEach(transaction => {
      // TODO: Check why transaction.value is string.
      balance[transaction.type] += parseFloat(transaction.value.toString());
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }
}

export default GetTransactionBalanceService;
