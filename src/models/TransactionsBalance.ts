class TransactionsBalance {
  income: number;

  outcome: number;

  total: number;

  constructor({ income, outcome, total }: TransactionsBalance) {
    this.income = income;
    this.outcome = outcome;
    this.total = total;
  }
}

export default TransactionsBalance;
