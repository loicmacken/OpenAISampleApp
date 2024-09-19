import { Transaction } from '../models/Transaction';

export const sampleTransactions: Array<Transaction> = [
  {
    id: 'TRN00001',
    amount: (100.00).toFixed(2).toString(),
    timestamp: new Date('2017-10-05').toISOString().slice(0, 19).replace('T', ' '),
    description: 'Test transaction 1',
    transactiontype: 'credit',
    accountnumber: 'ACCOUN0123456789',
    transactioncategory: null
  },
  {
    id: 'TRN00002',
    amount: (-200.00).toFixed(2).toString(),
    timestamp: new Date('2004-10-04').toISOString().slice(0, 19).replace('T', ' '),
    description: 'Test transaction 2',
    transactiontype: 'credit',
    accountnumber: 'ACCOUN0123456789',
    transactioncategory: null
  },
  {
    id: 'TRN00003',
    amount: (300.00).toFixed(2).toString(),
    timestamp: new Date('2020-01-12').toISOString().slice(0, 19).replace('T', ' '),
    description: 'Test transaction 3',
    transactiontype: 'credit',
    accountnumber: 'ACCOUN0123456789',
    transactioncategory: "Groceries"
  }
];