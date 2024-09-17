import jest from 'jest';
import { classifyTransaction, bulkClassifyTransactions } from '../services/OpenAIService';
import sampleTransactions from '../seeders/sampleTransactions';

describe('Unit tests for OpenAIService', () => {
  it('should classify a single transaction', async () => {
    const transaction = sampleTransactions[0];
    const classifiedTransaction = await classifyTransaction(transaction);
    await expect(transaction).toBeDefined();
    transaction.transactioncategory = "Groceries";
    await expect(classifiedTransaction).toEqual(transaction);
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
    const classifiedTransaction = await classifyTransaction(transaction);
    await expect(classifiedTransaction).not.toBeDefined();
  });

  it('should classify multiple transactions', async () => {
    const classifiedTransactions = await bulkClassifyTransactions(sampleTransactions);
    let expectedTransactions = JSON.parse(JSON.stringify(sampleTransactions));
    expectedTransactions.map((transaction: any) => {
      transaction.transactioncategory = "Groceries";
    });
    await expect(classifiedTransactions).toEqual(expectedTransactions);
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
    const classifiedTransactions = await bulkClassifyTransactions(transactions);
    await expect(classifiedTransactions.length).toBeLessThan(1);
  });
});