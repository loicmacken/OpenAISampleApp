import pool from "../models/index";

const samepleTransactions = [
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

export default {
  up: async () => {
    await pool.query(
      `
        INSERT INTO transactions (id, amount, timestamp, description, transactionType, accountNumber, transactionCategory)
        VALUES 
        ('${samepleTransactions[0].id}', ${samepleTransactions[0].amount}, '${samepleTransactions[0].timestamp}', '${samepleTransactions[0].description}', '${samepleTransactions[0].transactionType}', '${samepleTransactions[0].accountNumber}', ${samepleTransactions[0].transactionCategory ? `'${samepleTransactions[0].transactionCategory}'` : null}),
        ('${samepleTransactions[1].id}', ${samepleTransactions[1].amount}, '${samepleTransactions[1].timestamp}', '${samepleTransactions[1].description}', '${samepleTransactions[1].transactionType}', '${samepleTransactions[1].accountNumber}', ${samepleTransactions[1].transactionCategory ? `'${samepleTransactions[1].transactionCategory}'` : null}),
        ('${samepleTransactions[2].id}', ${samepleTransactions[2].amount}, '${samepleTransactions[2].timestamp}', '${samepleTransactions[2].description}', '${samepleTransactions[2].transactionType}', '${samepleTransactions[2].accountNumber}', ${samepleTransactions[2].transactionCategory ? `'${samepleTransactions[2].transactionCategory}'` : null})
        RETURNING *;
      `
    );
  },
  down: async () => {
    await pool.query(
      `
      DROP TABLE transactions;
      `
    );
  }
};
