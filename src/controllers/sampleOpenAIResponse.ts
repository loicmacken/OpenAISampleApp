import TransactionCategory from "../models/TransactionCategory"
import sampleTransactions from "../seeders/sampleTransactions"

export default {
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1702685778,
  "model": "gpt-4o-mini",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "system",
        "content": ""
      },
      "logprobs": {
        "content": [
          {
            "token": TransactionCategory[0],
            "logprob": -0.1,
            "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
            "top_logprobs": [
              {
                "token": TransactionCategory[0],
                "logprob": -0.1,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },
              {
                "token": TransactionCategory[1],
                "logprob": -0.2,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },
              {
                "token": TransactionCategory[2],
                "logprob": -0.3,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },
              {
                "token": TransactionCategory[3],
                "logprob": -0.32,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },
              {
                "token": TransactionCategory[4],
                "logprob": -0.02,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },          {
                "token": TransactionCategory[5],
                "logprob": -0.01,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },          {
                "token": TransactionCategory[6],
                "logprob": -3.1,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },          {
                "token": TransactionCategory[7],
                "logprob": -1.5,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },          {
                "token": TransactionCategory[8],
                "logprob": -0.0005,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              },          {
                "token": TransactionCategory[9],
                "logprob": -0.0001,
                "bytes": [1, 2, 3, 4, 5, 6, 7, 8, 9],
              }, 
            ]
          }
        ]
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 9,
    "total_tokens": 18
  },
  "system_fingerprint": null
}
