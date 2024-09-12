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
    try {
      await pool.query(
        `
        CREATE TABLE transactions (
          id VARCHAR(8) PRIMARY KEY NOT NULL UNIQUE CHECK (id ~ '^[a-zA-Z]{3}[0-9]{5}$'),
          amount DECIMAL(10, 2) NOT NULL,
          timestamp TIMESTAMP NOT NULL,
          description VARCHAR(255),
          transactionType VARCHAR(64) NOT NULL,
          accountNumber VARCHAR(16) NOT NULL CHECK (accountNumber ~ '^[a-zA-Z]{6}[0-9]{10}$'),
          transactionCategory VARCHAR(64) CHECK (transactionCategory IN ('Groceries', 'Dining Out', 'Utilities', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Housing', 'Education', 'Miscellaneous'))
        );
        `
      );
    } catch (error) {
      console.error(error);
    }
  },
  down: async () => {
    try {
      await pool.query(
        `
        DROP TABLE transactions;
        `
      );
    } catch (error) {
      console.error(error);
    }
  }
};
