import OpenAI from 'openai';

import sampleOpenAIResponse from '../controllers/sampleOpenAIResponse';
import sampleTransactions from '../seeders/sampleTransactions';
import validateTransaction from '../validators/TransactionValidator';

export const classifyTransaction = async (transaction: any) => {
  if (validateTransaction(transaction)) {
    let openAIResponse: any;

    // skip openAI API call in test and dev environment
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      openAIResponse = sampleOpenAIResponse;
    }
    else {
      // call openAI API to classify transaction
      const key = process.env.OPENAI_API_KEY;

      const client = new OpenAI({
        apiKey: key
      });
      const openAIreq = {
        model: 'gpt-4o-mini',
        messages: [
          {
            "role": "system",
            "content": `You have a new transaction to classify. 
            All transactions should be classified into one of the following categories: `
              + sampleTransactions.map((transaction: any) => transaction.transactioncategory).join(', ') + `.
            Please classify the following transaction: ` + transaction.description,
          }
        ],
        logprobs: true,
        n: 1,
        top_logprobs: 10
      };
      openAIResponse = await client.chat.completions.create(openAIreq as any) as any;
    }

    // return transaction with category
    const category = openAIResponse.choices[0].logprobs.content[0].top_logprobs[0].token;
    transaction.transactioncategory = category;
    return transaction;
  }

  return undefined;
}

export const bulkClassifyTransactions = async (transactions: Array<any>) => {
  let classifiedTransactions: Array<any> = [];

  for (const transaction of transactions) {
    if (!validateTransaction(transaction)) {
      continue;
    }
    let classifiedTransaction = transaction;
    if (classifiedTransaction.transactioncategory === null) {
      classifiedTransaction = await classifyTransaction(transaction);
    }
    classifiedTransactions.push(classifiedTransaction);
  }
  return classifiedTransactions;
}