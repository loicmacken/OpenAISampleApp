# OpenAISampleApp

Classify banking transactions into 10 predefined categories.

## Prerequisites

- Docker and docker-compose.
- Node.

## Usage

To run the app, first clone the repository:

```
  git clone <url>
```

Then copy `.env.example` and rename it to `.env`. Here you should fill in the `OPENAI_API_KEY` with your own key.

Then run the docker compose command to run the container:

```
  docker compose up
```

Now you can access the api from the following url:

```
  localhost:6868
```

## API Documentation

The API contains the following endpoints:
- GET `/transactions`: returns all transactions. Example request:
```
  curl -XGET 'localhost:6868/transactions'
```
- Example response body:
```
  [
    {
        "id": "TRN10010",
        "amount": "-200.00",
        "timestamp": "2021-05-05 00:00:00",
        "description": "Rent Payment",
        "transactiontype": "debit",
        "accountnumber": "ACCOUN0123456789",
        "transactioncategory": "Utilities"
    },
    {
        "id": "TRN10011",
        "amount": "-50.00",
        "timestamp": "2021-05-12 00:00:00",
        "description": "Albert-Heijn Purchase",
        "transactiontype": "credit",
        "accountnumber": "ACCOUN0123456789",
        "transactioncategory": "Groceries"
    }
  ]
```
- GET `/transactions/:id`: returns a single transaction. Example request:
```
  curl -XGET 'localhost:6868/transactions/TRN10010'
```
- Example response body:
```
  {
      "id": "TRN10010",
      "amount": "-200.00",
      "timestamp": "2021-05-05 00:00:00",
      "description": "Rent Payment",
      "transactiontype": "debit",
      "accountnumber": "ACCOUN0123456789",
      "transactioncategory": "Utilities"
  }
```
- POST `/transactions`: create a new transaction and classify it using the OpenAI API. Returns the classified transaction. Example request:
```
  curl -XPOST -H "Content-type: application/json" -d '{
      "id": "TRN10010",
      "amount": "-200.00",
      "timestamp": "2021-05-05 00:00:00",
      "description": "Rent Payment",
      "transactiontype": "debit",
      "accountnumber": "ACCOUN0123456789"
  }' 'localhost:6868/transactions'
```
- Example response:
```
  {
      "id": "TRN10010",
      "amount": "-200.00",
      "timestamp": "2021-05-05 00:00:00",
      "description": "Rent Payment",
      "transactiontype": "debit",
      "accountnumber": "ACCOUN0123456789",
      "transactioncategory": "Utilities"
  }
```

### Import and export CSV data

You can add transactions to the database to be classified in bulk by providing a csv file containing the transactions and setting the path to it in the variable `CSV_IMPORT_PATH` in `.env`. Then you can import them using the command:
```
  docker exec <container-id> npm run db:importcsv
```
Where `<container-id>` is the `id` of the created `web-1` container. You can find it by running `docker ps -a`. 
The CSV header row is expected to be in the following format:
`Transaction ID,Amount,Timestamp,Description,Transaction Type,Account Number,Transaction Category`.

Similarly, you can export transactions from a csv file by setting the `CSV_EXPORT_PATH` and then running:
```
  docker exec <container-id> npm run db:exportcsv
```

## Trade-offs:

### Tech stack:
- Node (TypeScript) + express as backend: straightforward solution for small applications, easy to make a few API routes, but does not provide structure such as Model View Controller templates.
- Docker for containerization: the industry standard.
- PostgreSQL as database: Data is structured so using SQL is a good way to store data in a logical way and have easy methods for querying. When databases get larger and lots of complex joins are used, it can result in worse performance so then noSQL might be a better option. Postgres was used as it is common in production environments so a good representative framework for real apps.
- `pg` for accessing database and processing queries: since this is a simple application, it is acceptable to hardcode SQL queries and then use them on the database. However, this would not be recommended in larger projects as the queries are difficult to maintain and debug. In addition, care should be taken to sanitise queries in order to prevent SQL injection.
- `openai` to access the OpenAI API for classification.
- `jest` for testing purposes: an easy-to-use framework to create unit and integration tests.

### Security:
- No effort was taken to prevent SQL injection, in production environments care should be taken to sanitise SQL queries or use a reliable framework that does it for you.
- Most environment variables are also filled in in the example environment file, including the database name and password. Normally you would only fill these in in the local environment file and not share them (but since in this case the database is only stored locally, it does not matter). The only exception is the OpenAI API key, as it has some actual value.
- The csv containing example transaction data was kept locally. In a production environment, this would be real bank data which should definitely not be shared. Instead, csv files can be down- and uploaded with provided npm scripts, as described in the Usage section.
