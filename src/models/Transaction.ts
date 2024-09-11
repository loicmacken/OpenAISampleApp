import { Model, DataTypes, Sequelize } from 'sequelize';

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
      autoIncrement: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255)
    },
    transactionType: {
      type: DataTypes.STRING(31),
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    transactionCategory: {
      type: DataTypes.STRING(31)
    }
  }, {
    sequelize,
    tableName: 'transactions',
    timestamps: false
  });
  Transaction.sync();
}