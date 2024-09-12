import Transaction from "../models/Transaction";
import pool from "../models/index";

export default {
  up: async () => {
    await pool.query(
      `
      CREATE TABLE transactions (
        ${Transaction}
      );
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
}
