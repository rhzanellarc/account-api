import { Inject } from "@nestjs/common";
import { DependencyInjection } from "../infra/enum/DependencyInjection";
import AccountGatewayInterface from "../domain/gateway/AccountGatewayInterface";
import EventInputDto from "../domain/value-object/EventInputDto";
import EventOutputDto from "../domain/value-object/EventOutputDto";
import Adapter from "../domain/adapter/Adapter";
import Account from "../domain/entity/Account";
import AccountDto from "../domain/value-object/AccountDto";
import EventBase from "./EventBase";

export default class Transfer extends EventBase {
    constructor(
        @Inject(DependencyInjection.ACCOUNT_GATEWAY)
        readonly accountGateway: AccountGatewayInterface,
        @Inject(DependencyInjection.ACCOUNT_ADDAPTER)
        readonly accountAdapter: Adapter<Account, AccountDto>
    ){
        super(accountGateway, accountAdapter);
    }

    async execute (input: EventInputDto): Promise<EventOutputDto> {
        let originAccount = await this.getAccount(input.origin);
        let destinationAccount = await this.accountGateway.findById(input.destination);
        
        if (!destinationAccount) {
            destinationAccount = new Account(input.destination, 0)
            destinationAccount = await this.accountGateway.create(destinationAccount);
        }

        originAccount.withdraw(input.amount);
        destinationAccount.deposit(input.amount);

        originAccount = await this.accountGateway.update(originAccount);
        destinationAccount = await this.accountGateway.update(destinationAccount);

        return this.createResponse(originAccount, destinationAccount);
    }

    createResponse(originAccount: Account, destinationAccount: Account): EventOutputDto {
        const response = new EventOutputDto();
        response.setOrigin(this.accountAdapter.domainToDto(originAccount));
        response.setDestination(this.accountAdapter.domainToDto(destinationAccount));
        return response;
    }
}
