import jest from 'jest';
import { classifyTransaction, bulkClassifyTransactions } from '../services/OpenAIService';
import sampleTransactions from '../seeders/sampleTransactions';

describe('Unit tests for OpenAIController', () => {
  it('should classify a single transaction', async () => {
    const transaction = sampleTransactions[0];
    const classifiedTransaction = await classifyTransaction(transaction);
    expect(transaction).toBeDefined();
    transaction.transactioncategory = "Groceries";
    expect(classifiedTransaction).toEqual(transaction);
  });

  it('should throw an error if transaction data is invalid', async () => {
    const transaction = {
      id: 'xxxxx',
      amount: -200.00,
      timestamp: 'xxxx-xx-xx',
      description: 'Test transaction 4',
      transactiontype: 'debit',
      accountnumber: 'ACCOUN0123456789'
    };
    expect(async () => {
      await classifyTransaction(transaction);
    }).toThrow('Invalid transaction');
  });

  it('should classify multiple transactions', async () => {
    const classifiedTransactions = await bulkClassifyTransactions(sampleTransactions);
    let expectedTransactions = Object.create(sampleTransactions);
    expectedTransactions.map((transaction: any) => {
      transaction.transactioncategory = "Groceries";
    });
    expect(classifiedTransactions).toEqual(expectedTransactions);
  });

  it('should throw an error if bulk transaction data is invalid', async () => {
    const transactions = [
      {
        id: 'xxxxx',
        amount: 'xxxxx',
        timestamp: 'xxxxx',
        description: 'Test transaction 4',
        transactiontype: 'debit',
        accountnumber: 'ACCOUN0123456789'
      }
    ];
    expect(async () => {
      await bulkClassifyTransactions(transactions);
    }).toThrow('No valid transactions to classify');
  });
});