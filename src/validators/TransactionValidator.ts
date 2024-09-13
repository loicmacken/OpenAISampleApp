export default (transaction: any) => {
  const validId = transaction.id && typeof transaction.id === 'string' && transaction.id.length === 8;
  const validAmount = transaction.amount && typeof transaction.amount === 'string' && !isNaN(parseFloat(transaction.amount));
  const validTimestamp = transaction.timestamp && typeof transaction.timestamp === 'string' && !isNaN(Date.parse(transaction.timestamp));
  const validTransactionType = transaction.transactiontype && typeof transaction.transactiontype === 'string';
  const validAccountNumber = transaction.accountnumber && typeof transaction.accountnumber === 'string' && transaction.accountnumber.length === 16;
  if (validId && validAmount && validTimestamp && validTransactionType && validAccountNumber) {
    return true;
  }
  return false;
}