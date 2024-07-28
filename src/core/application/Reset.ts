import { Inject } from "@nestjs/common";
import { DependencyInjection } from "../infra/enum/DependencyInjection";
import AccountGatewayInterface from "../domain/gateway/AccountGatewayInterface";

export default class Reset {
    constructor(
        @Inject(DependencyInjection.ACCOUNT_GATEWAY)
        private readonly accountGateway: AccountGatewayInterface
    ){}

    async execute () {
        this.accountGateway.reset();
    }
}
