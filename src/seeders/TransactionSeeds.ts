import pool from "../models/index";

import sampleTransactions from "./sampleTransactions";

export default {
  up: async () => {
    try {
      await pool.query(
        `
        INSERT INTO transactions (id, amount, timestamp, description, transactionType, accountNumber, transactionCategory)
        VALUES 
        ('${sampleTransactions[0].id}', ${sampleTransactions[0].amount}, '${sampleTransactions[0].timestamp}', '${sampleTransactions[0].description}', '${sampleTransactions[0].transactionType}', '${sampleTransactions[0].accountNumber}', ${sampleTransactions[0].transactionCategory ? `'${sampleTransactions[0].transactionCategory}'` : null}),
        ('${sampleTransactions[1].id}', ${sampleTransactions[1].amount}, '${sampleTransactions[1].timestamp}', '${sampleTransactions[1].description}', '${sampleTransactions[1].transactionType}', '${sampleTransactions[1].accountNumber}', ${sampleTransactions[1].transactionCategory ? `'${sampleTransactions[1].transactionCategory}'` : null}),
        ('${sampleTransactions[2].id}', ${sampleTransactions[2].amount}, '${sampleTransactions[2].timestamp}', '${sampleTransactions[2].description}', '${sampleTransactions[2].transactionType}', '${sampleTransactions[2].accountNumber}', ${sampleTransactions[2].transactionCategory ? `'${sampleTransactions[2].transactionCategory}'` : null})
        RETURNING *;
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
