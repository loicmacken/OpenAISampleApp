import OpenAI from 'openai';

import sampleTransactions from '../seeders/sampleTransactions';
import validateTransaction from '../validators/TransactionValidator';

const openAIClassifyTransactions = async (transactions: Array<any>) => {
  // skip openAI API call in test and dev environment
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    transactions.map((transaction: any) => {
      transaction.transactioncategory = "Groceries";
    });
    return transactions;
  }

  // call openAI API to classify transactions
  const key = process.env.OPENAI_API_KEY;
  const client = new OpenAI({
    apiKey: key
  });
  const openAIreq = {
    model: 'gpt-4o-mini',
    messages: transactions.map((transaction: any) => {
      return {
        "role": "system",
        "content": `You have a new transaction to classify. 
        All transactions should be classified into one of the following categories: `
          + sampleTransactions.map((transaction: any) => transaction.transactioncategory).join(', ') + `.
        Please classify the following transaction: ` + transaction.description,
      };
    }),
    logprobs: true,
    n: 1,
    top_logprobs: 10
  };
  const openAIResponse = await client.chat.completions.create(openAIreq as any) as any;

  // return transactions with category
  openAIResponse.choices.map((choice: any, index: number) => {
    transactions[index].transactioncategory = choice.logprobs.content[0].top_logprobs[0].token;
  });

  return transactions;
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