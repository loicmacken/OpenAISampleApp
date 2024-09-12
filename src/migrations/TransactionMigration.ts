import Transaction from "../models/Transaction";
import pool from "../models/index";

export default {
  up: async () => {
    try {
      await pool.query(
        `
        CREATE TABLE transactions (
          ${Transaction}
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
}
