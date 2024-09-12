import TransactionCategory from './TransactionCategory';

export default `
  id VARCHAR(8) PRIMARY KEY NOT NULL UNIQUE CHECK (id ~ '^[a-zA-Z]{3}[0-9]{5}$'),
  amount DECIMAL(10, 2) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  description VARCHAR(255),
  transactionType VARCHAR(64) NOT NULL,
  accountNumber VARCHAR(16) NOT NULL CHECK (accountNumber ~ '^[a-zA-Z]{6}[0-9]{10}$'),
  transactionCategory VARCHAR(64) CHECK (transactionCategory IN (${TransactionCategory.map(category => `'${category}'`).join(', ')}))
`;