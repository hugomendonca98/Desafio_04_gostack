import TransactionsRepository from '../repositories/TransactionsRepository';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class BalanceTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): BalanceDTO {
    const allTransactions = this.transactionsRepository.all();

    function transactionType(type: string): number {
      return allTransactions.reduce((total, elemento): number => {
        if (elemento.type === type) return total + elemento.value;
        return total;
      }, 0);
    }

    const inCome = transactionType('income');
    const outCome = transactionType('outcome');
    const total = inCome - outCome;

    return { income: inCome, outcome: outCome, total };
  }
}

export default BalanceTransactionsService;
