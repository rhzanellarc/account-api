import { Inject } from "@nestjs/common";
import { DependencyInjection } from "../infra/enum/DependencyInjection";
import AccountGatewayInterface from "../domain/gateway/AccountGatewayInterface";
import EventInputDto from "../domain/value-object/EventInputDto";
import EventOutputDto from "../domain/value-object/EventOutputDto";
import Adapter from "../domain/adapter/Adapter";
import Account from "../domain/entity/Account";
import AccountDto from "../domain/value-object/AccountDto";
import EventBase from "./EventBase";

export default class Deposit extends EventBase {
    constructor(
        @Inject(DependencyInjection.ACCOUNT_GATEWAY)
        readonly accountGateway: AccountGatewayInterface,
        @Inject(DependencyInjection.ACCOUNT_ADDAPTER)
        readonly accountAdapter: Adapter<Account, AccountDto>
    ){
        super(accountGateway, accountAdapter);
    }

    async execute (input: EventInputDto): Promise<EventOutputDto> {
        let account = await this.accountGateway.findById(input.destination);
        if (!account) {
            account = new Account(input.destination, 0)
            account = await this.accountGateway.create(account);
        }
        account.deposit(input.amount);
        account = await this.accountGateway.update(account);
        return this.createResponse(account);
    }

    createResponse(account: Account): EventOutputDto {
        const response = new EventOutputDto();
        response.setDestination(this.accountAdapter.domainToDto(account));
        return response;
    }
}
