import Transaction from '../models/Transaction';
import BalanceTransactionService from '../services/BalanceTransactionsService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = new BalanceTransactionService(this);
    const balanceDTO = balance.execute();
    return balanceDTO;
  }

  public create({ title, type, value }: CreateDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
