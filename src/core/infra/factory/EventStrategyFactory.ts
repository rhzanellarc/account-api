import EventBase from "@app/core/application/EventBase";
import EventInputDto from "../../domain/value-object/EventInputDto";
import { EventTypeEnum } from "@app/core/infra/enum/EventTypeEnum";
import { ModuleRef } from "@nestjs/core";
import { DependencyInjection } from "../enum/DependencyInjection";
import InvalidTypeError from "@app/core/domain/errors/InvalidTypeError";
import { Injectable } from "@nestjs/common";
import Deposit from "@app/core/application/Deposit";
import InvalidParametersError from "@app/core/domain/errors/InvalidParametersError";

@Injectable()
export default class EventStrategyFactory {
    constructor(readonly moduleRef: ModuleRef) {}

    create(input: EventInputDto): EventBase {
        switch(input.type) {
            case EventTypeEnum.Deposit:
                return this.createDeposit(input);
            case EventTypeEnum.Withdraw:
                return this.createWithdraw(input);
            case EventTypeEnum.Transfer:
                return this.createTransfer(input);
            default:
                throw new InvalidTypeError()
        }
    }

    private createDeposit(input: EventInputDto): Deposit {
        if (!(input.destination || input.amount)) {
            throw new InvalidParametersError();
        }
        return this.moduleRef.get(DependencyInjection.DEPOSIT, { strict: false });
    }

    private createWithdraw(input: EventInputDto): Deposit {
        if (!(input.origin || input.amount)) {
            throw new InvalidParametersError();
        }
        return this.moduleRef.get(DependencyInjection.WITHDRAW, { strict: false });
    }

    private createTransfer(input: EventInputDto): Deposit {
        if (!(input.origin || input.destination || input.amount)) {
            throw new InvalidParametersError();
        }
        return this.moduleRef.get(DependencyInjection.TRANSFER, { strict: false });
    }
}