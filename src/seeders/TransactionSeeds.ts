import pool from "../models/index";

import { sampleTransactions } from "./sampleTransactions";

export default {
  up: async () => {
    const client = await pool.connect();
    try {
      await client.query(
        `
        INSERT INTO transactions (id, amount, timestamp, description, transactiontype, accountnumber, transactioncategory)
        VALUES 
        ('${sampleTransactions[0].id}', ${sampleTransactions[0].amount}, '${sampleTransactions[0].timestamp}', '${sampleTransactions[0].description}', '${sampleTransactions[0].transactiontype}', '${sampleTransactions[0].accountnumber}', ${sampleTransactions[0].transactioncategory ? `'${sampleTransactions[0].transactioncategory}'` : null}),
        ('${sampleTransactions[1].id}', ${sampleTransactions[1].amount}, '${sampleTransactions[1].timestamp}', '${sampleTransactions[1].description}', '${sampleTransactions[1].transactiontype}', '${sampleTransactions[1].accountnumber}', ${sampleTransactions[1].transactioncategory ? `'${sampleTransactions[1].transactioncategory}'` : null}),
        ('${sampleTransactions[2].id}', ${sampleTransactions[2].amount}, '${sampleTransactions[2].timestamp}', '${sampleTransactions[2].description}', '${sampleTransactions[2].transactiontype}', '${sampleTransactions[2].accountnumber}', ${sampleTransactions[2].transactioncategory ? `'${sampleTransactions[2].transactioncategory}'` : null})
        RETURNING *;
        `
      );
    } catch (error) {
      console.error(error);
    } finally {
      client.release();
    }
  },
  down: async () => {
    const client = await pool.connect();
    try {
      await client.query(
        `
        DROP TABLE transactions;
        `
      );
    } catch (error) {
      console.error(error);
    } finally {
      client.release();
    }
  }
};
