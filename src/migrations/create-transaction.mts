import { Sequelize, QueryInterface } from 'sequelize';
import Transaction from '../models/Transaction';

export default {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.createTable('transactions', Transaction);
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};
