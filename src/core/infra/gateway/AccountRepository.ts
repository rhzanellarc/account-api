import AccountGatewayInterface from "../../domain/gateway/AccountGatewayInterface";
import Account from "@app/core/domain/entity/Account";
import { DataSource, Repository } from "typeorm";
import { AccountEntity } from "../repository/Account.entity";
import { Inject } from "@nestjs/common";
import { DependencyInjection } from "../enum/DependencyInjection";

export default class AccountRepository implements AccountGatewayInterface {
    constructor(
        @Inject(DependencyInjection.ACCOUNT_REPOSITORY)
        readonly repository: Repository<AccountEntity>,
        @Inject(DependencyInjection.ACCOUNT_ADDAPTER)
        private dataSource: DataSource,
      ) {}

    async update(account: Account): Promise<Account> {
        let entity = this.createEntity(account);
        entity = await this.repository.save(entity);

        return new Account(entity.accountId, entity.balance, entity.id)
    }

    async findById(accountId: string): Promise<Account> {
        const entity = await this.repository.findOne({
            where: {
                accountId: accountId,
            },
        });
        if (!entity) {
            return null;
        }
        return new Account(entity.accountId, entity.balance, entity.id)
    }

    async create(account: Account): Promise<Account> {
        let entity = this.createEntity(account);
        entity = await this.repository.save(entity);

        return new Account(entity.accountId, entity.balance, entity.id)
    }

    createEntity(account: Account): AccountEntity {
        const entity = new AccountEntity();
        entity.id = account.getId();
        entity.accountId = account.getAccountId();
        entity.balance = account.getBalance();

        return entity;
    }

    async reset() {
        await this.repository.query('DELETE FROM account');
      }
}