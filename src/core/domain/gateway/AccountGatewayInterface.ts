import Account from "../entity/Account";

export default interface AccountGatewayInterface {
    findById(id: string): Promise<Account>;
    create(account: Account): Promise<Account>;
    update(account: Account): Promise<Account>;
    reset();
}