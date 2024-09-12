import { Sequelize, QueryInterface } from 'sequelize';
import TransactionCategory from '../models/TransactionCategory';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return await queryInterface.bulkInsert('transactions', [
      {
        id: 'TRN00001',
        amount: 100.00,
        timestamp: new Date(),
        description: 'Test transaction 1',
        transactionType: 'credit',
        accountNumber: 'ACCOUN0123456789',
        transactionCategory: null
      },
      {
        id: 'TRN00002',
        amount: -200.00,
        timestamp: new Date(),
        description: 'Test transaction 2',
        transactionType: 'credit',
        accountNumber: 'ACCOUN0123456789',
        transactionCategory: null
      },
      {
        id: 'TRN00003',
        amount: 300.00,
        timestamp: new Date(),
        description: 'Test transaction 3',
        transactionType: 'credit',
        accountNumber: 'ACCOUN0123456789',
        transactionCategory: TransactionCategory[0]
      }
    ]);
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return await queryInterface.bulkDelete('transactions', null as any, {});
  }
};

