import OpenAI from 'openai';

import { TransactionCategory } from '../models/TransactionCategory';
import validateTransaction from '../validators/TransactionValidator';
import { Transaction } from '../models/Transaction';

const openAIClassifySingleTransaction = async (transaction: Transaction) => {
  const key = process.env.OPENAI_API_KEY;
  const client = new OpenAI({
    apiKey: key
  });
  const requestParams = {
    model: 'gpt-4o-mini',
    messages: [{
        "role": "system",
        "content": `You have a new transaction to classify. 
        All transactions should be classified into one of the following categories: `
          + TransactionCategory.join(', ') + `.
        Please classify the following transaction: ` + transaction.description
          + ` as a response, please provide only category of the transaction as a single word. Example: Groceries`
    }],
    logprobs: true,
    n: 1,
    top_logprobs: 10
  } as OpenAI.Chat.ChatCompletionCreateParams;
  const chatCompletion = await client.chat.completions.create(requestParams) as OpenAI.Chat.ChatCompletion;

  // return transactions with category
  transaction.transactioncategory = chatCompletion.choices[0].message.content;

  return transaction;
}

const openAIClassifyTransactions = async (transactions: Array<Transaction>) => {
  // skip openAI API call in test and dev environment
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    transactions.map((transaction: Transaction) => {
      transaction.transactioncategory = "Groceries";
    });
    return transactions;
  }

  let classifiedTransactions: Array<Transaction> = []
  for (const transaction of transactions) {
    classifiedTransactions.push(await openAIClassifySingleTransaction(transaction));
  }

  return await classifiedTransactions;
}

export const classifyTransaction = async (transaction: Transaction) => {
  if (!validateTransaction(transaction)) {
    console.error("Invalid transaction data");
    return undefined;
  }
  
  const [classifiedTransaction]: Array<Transaction> =  await openAIClassifyTransactions([transaction]);
  return classifiedTransaction;
}

export const bulkClassifyTransactions = async (transactions: Array<Transaction>) => {
  for (const transaction of transactions) {
    if (!validateTransaction(transaction)) {
      console.error("Invalid transaction data");
      return [];
    }
  }

  return await openAIClassifyTransactions(transactions);
}