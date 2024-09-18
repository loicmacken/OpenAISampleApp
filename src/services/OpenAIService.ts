import OpenAI from 'openai';

import TransactionCategory from '../models/TransactionCategory';
import validateTransaction from '../validators/TransactionValidator';

const openAIClassifySingleTransaction = async (transaction: any) => {
  const key = process.env.OPENAI_API_KEY;
  const client = new OpenAI({
    apiKey: key
  });
  const openAIreq = {
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
  };
  const openAIResponse = await client.chat.completions.create(openAIreq as any) as any;

  // return transactions with category
  transaction.transactioncategory = openAIResponse.choices[0].message.content;

  return transaction;
}

const openAIClassifyTransactions = async (transactions: Array<any>) => {
  // skip openAI API call in test and dev environment
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    transactions.map((transaction: any) => {
      transaction.transactioncategory = "Groceries";
    });
    return transactions;
  }

  let classifiedTransactions: Array<any> = []
  for (const transaction of transactions) {
    classifiedTransactions.push(await openAIClassifySingleTransaction(transaction));
  }

  return await classifiedTransactions;
}

export const classifyTransaction = async (transaction: any) => {
  if (!validateTransaction(transaction)) {
    console.error("Invalid transaction data");
    return undefined;
  }
  
  const [classifiedTransaction]: any =  await openAIClassifyTransactions([transaction]);
  return classifiedTransaction;
}

export const bulkClassifyTransactions = async (transactions: Array<any>) => {
  for (const transaction of transactions) {
    if (!validateTransaction(transaction)) {
      console.error("Invalid transaction data");
      return [];
    }
  }

  return await openAIClassifyTransactions(transactions);
}