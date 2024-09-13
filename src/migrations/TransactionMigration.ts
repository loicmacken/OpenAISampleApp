import Transaction from "../models/Transaction";
import pool from "../models/index";

export default {
  up: async () => {
    const client = await pool.connect();
    try {
      await client.query(
        `
        CREATE TABLE transactions (
          ${Transaction}
        );
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
}
