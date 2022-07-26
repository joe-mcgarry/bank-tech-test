const Transaction = require('./transaction')

class Account {

  constructor(transaction = Transaction) {
    this.balance = 0;
    this.transaction = transaction;
    this.allTransactions = [];
  }

  setBalance(amount) {
    this.balance += amount;
  }

  deposit(amount) {
    const creditAmount = this.#formatMoney(amount);
    this.balance += amount;
    const newTransaction = new Transaction({ credit: amount, balance: this.balance });
    this.allTransactions.unshift(newTransaction);
    return `£${creditAmount} deposited. Balance is £${this.#formatMoney(this.balance)}`
  }

  withdraw(amount) {
    if (this.#checkWithdrawal(amount)){
      const debitAmount = this.#formatMoney(amount);
      if (debitAmount > this.balance) return "Must acquire additional resources"
      this.balance -= amount;
      const newTransaction = new Transaction({ debit: amount, balance: this.balance });
      this.allTransactions.unshift(newTransaction);
      return `Withdrew £${debitAmount}. Balance is £${this.#formatMoney(this.balance)}`
    } else {
      return "Withdrawal amount must be positive";
    }
    
  }

  printStatement() {
    if (this.allTransactions.length !== 0) {
      return this.printHeading() + this.allTransactions.map((item) => {
        return(`${item.showTransaction()}`);
      }).join("\n");
    } else {
     console.log(` || || || `);
    }
  }

  printHeading() {
    return "DATE || CREDIT || DEBIT || BALANCE\n"
  }

  #checkWithdrawal(amount) {
    return (amount < 0 ? false : true) 
  }

  #formatMoney(value) {
    return value.toFixed(2);
  }

}

module.exports = Account