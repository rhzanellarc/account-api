import { Inject } from "@nestjs/common";
import { DependencyInjection } from "../infra/enum/DependencyInjection";
import AccountGatewayInterface from "../domain/gateway/AccountGatewayInterface";
import AccountNotFoundError from "../domain/errors/AccountNotFoundError";
import InvalidParametersError from "../domain/errors/InvalidParametersError";

export default class Balance {
    constructor(
        @Inject(DependencyInjection.ACCOUNT_GATEWAY)
        private readonly accountGateway: AccountGatewayInterface
    ){}

    async execute (accountId: string): Promise<number> {
        if (!accountId) {
            throw new InvalidParametersError('Account id is required.');
        }
        const account = await this.accountGateway.findById(accountId);
        if (!account) {
            throw new AccountNotFoundError(`Account id ${accountId} not found.`);
        }
        return account.getBalance();
    }
}
