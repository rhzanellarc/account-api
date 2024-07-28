import InsufficientBalanceError from "../errors/InsufficientBalanceError";

export default class Account {
    private id: number;
    private accountId: string;
    private balance: number;

    constructor(accountId: string, balance: number, id?: number) {
        this.accountId = accountId;
        this.balance = balance;
        this.id = id;
    }

    getBalance(): number {
        return this.balance;
    }

    deposit(amount: number) {
        this.balance += amount;
    } 
    
    withdraw(amount: number) {
        if (this.balance < amount) {
            throw new InsufficientBalanceError()
        }
        this.balance -= amount;
    }

    getId():number {
        return this.id;
    }

    getAccountId(): string {
        return this.accountId;
    }
}