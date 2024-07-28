import { Module } from '@nestjs/common';
import { EventController } from '@app/core/infra/controller/EventController';
import { DataseModule } from './database.module';
import { DependencyInjection } from '@app/core/infra/enum/DependencyInjection';
import AccountAdapter from '@app/core/domain/adapter/AccountAdapter';
import AccountRepository from '@app/core/infra/gateway/AccountRepository';
import { AccountEntity } from '@app/core/infra/repository/Account.entity';
import { accountProviders } from '@app/core/infra/database/providers';
import { databaseProviders } from '@app/core/infra/database/database.provider';
import EventStrategyFactory from '@app/core/infra/factory/EventStrategyFactory';
import Deposit from '@app/core/application/Deposit';
import Withdraw from '@app/core/application/Withdraw';
import Transfer from '@app/core/application/Transfer';
import { BalanceController } from '@app/core/infra/controller/BalanceController';
import Balance from '@app/core/application/Balance';
import Reset from '@app/core/application/Reset';
import { ResetController } from '@app/core/infra/controller/ResetController';

@Module({
  imports: [DataseModule],
  controllers: [EventController, BalanceController, ResetController],
  providers: [
    ...accountProviders,
    {
      provide: DependencyInjection.ACCOUNT_ADDAPTER,
      useClass: AccountAdapter,
    },
    {
      provide: DependencyInjection.ACCOUNT_GATEWAY,
      useClass: AccountRepository,
    },
    {
      provide: DependencyInjection.EVENT_STRATEGY_FACTORY,
      useClass: EventStrategyFactory,
    },
    {
      provide: DependencyInjection.DEPOSIT,
      useClass: Deposit,
    },
    {
      provide: DependencyInjection.WITHDRAW,
      useClass: Withdraw,
    },
    {
      provide: DependencyInjection.TRANSFER,
      useClass: Transfer,
    },
    {
      provide: DependencyInjection.BALANCE,
      useClass: Balance,
    },
    {
      provide: DependencyInjection.RESET,
      useClass: Reset,
    },
  ],
})
export class AppModule {}
