export default [
  {
    id: 'TRN00001',
    amount: 100.00,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    description: 'Test transaction 1',
    transactionType: 'credit',
    accountNumber: 'ACCOUN0123456789',
    transactionCategory: null
  },
  {
    id: 'TRN00002',
    amount: -200.00,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    description: 'Test transaction 2',
    transactionType: 'credit',
    accountNumber: 'ACCOUN0123456789',
    transactionCategory: null
  },
  {
    id: 'TRN00003',
    amount: 300.00,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    description: 'Test transaction 3',
    transactionType: 'credit',
    accountNumber: 'ACCOUN0123456789',
    transactionCategory: "Groceries"
  }
];