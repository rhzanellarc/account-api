import { Inject } from "@nestjs/common";
import { DependencyInjection } from "../infra/enum/DependencyInjection";
import AccountGatewayInterface from "../domain/gateway/AccountGatewayInterface";
import AccountNotFoundError from "../domain/errors/AccountNotFoundError";
import EventInputDto from "../domain/value-object/EventInputDto";
import EventOutputDto from "../domain/value-object/EventOutputDto";
import Adapter from "../domain/adapter/Adapter";
import Account from "../domain/entity/Account";
import AccountDto from "../domain/value-object/AccountDto";
import EventInterface from "./interfaces/EventInterface";

export default abstract class EventBase implements EventInterface {
    constructor(
        @Inject(DependencyInjection.ACCOUNT_GATEWAY)
        readonly accountGateway: AccountGatewayInterface,
        @Inject(DependencyInjection.ACCOUNT_ADDAPTER)
        readonly accountAdapter: Adapter<Account, AccountDto>
    ){}

    abstract execute(input: EventInputDto): Promise<EventOutputDto>;

    async getAccount(input: string): Promise<Account> {
        const account = await this.accountGateway.findById(input);
        if (!account) {
            throw new AccountNotFoundError();
        }
        return account;
    }

}