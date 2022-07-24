const Account = require('./account');

describe('Account', () => {
  describe('showBalance', () => {
    it('initially has a balance of 0.00', () => {
      const account = new Account();
      expect(account.showBalance()).toEqual(0.00);
    })
  })

  describe('Deposit', () => {
    it("adds 5.00 to the balance", () => {
      const account = new Account();
      account.deposit(5.00);
      expect(account.showBalance()).toEqual(5.00);
    })

    it("adds 50.00 and 1000.00 to the balance", () => {
      const account = new Account();
      account.deposit(50.00);
      account.deposit(1000.00);
      expect(account.showBalance()).toEqual(1050.00);
    })
  })

  describe('Withdraw', () => {
    //doesn't let you withdraw to negative numbers
    it('withdraws 5.00 from the balance', () => {
      const account = new Account();
      account.deposit(50.00);
      account.withdraw(5.00);
      expect(account.showBalance()).toEqual(45.00);
    })

    it("won't withdraw if withdrawal is greater than balance", ()  => {
      const account = new Account();
      expect(account.withdraw(50)).toEqual("Must acquire additional resources")
    })

    it('withdraws 5.00 and 41.50 from the balance', () => {
      const account = new Account();
      account.deposit(50.00);
      account.withdraw(5.00);
      account.withdraw(41.50);
      expect(account.showBalance()).toEqual(3.50);
    })
  })

  it('shows the date', () => {
    const account = new Account();
    expect(account.getTransactionDate()).toEqual("24/07/2022 ");
  })

  it('formats the information to display like: DATE || CREDIT || DEBIT || BALANCE', () => {
    const account = new Account();
    account.deposit(1000);
    expect(account.display()).toEqual("24/07/2022 || 1000.00 || || 1000.00 ");
  })

  it('initially prints out an empty statement', () => {
    const account = new Account();
    const date = "24/07/2022"
    expect(account.printStatement()).toEqual(`date || credit || debit || balance\n${date} || || || 0.00 `)
  })

  it('formats the withdrawal, deposit, balance and date into a statement with a deposit values', () => {
    //const statement = new Statement();
    const account = new Account();
    account.deposit(100.00);
    expect(account.printStatement()).toEqual("date || credit || debit || balance\n24/07/2022 || 100.00 || || 100.00 ")
  })

})