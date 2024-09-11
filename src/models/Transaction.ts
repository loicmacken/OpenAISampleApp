import { Model, DataTypes, Sequelize } from 'sequelize';

import TransactionCategory from './TransactionCategory';

export default class Transaction extends Model {
  public id!: string;
  public amount!: number;
  public timestamp!: Date;
  public description?: string;
  public transactionType!: string;
  public accountNumber!: string;
  public transactionCategory?: string;
}

export const TransactionMap = (sequelize: Sequelize) => {
  Transaction.init({
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z]{3}[0-9]{5}$/i
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255)
    },
    transactionType: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate: {
        is: /^[a-zA-Z]{6}[0-9]{10}$/i
      }
    },
    transactionCategory: {
      type: DataTypes.STRING(64),
      allowNull: true,
      validate: {
        isIn: [TransactionCategory]
      }
    }
  }, {
    sequelize,
    tableName: 'transactions',
    timestamps: false
  });
  Transaction.sync();
}