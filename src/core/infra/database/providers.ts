import { DataSource } from 'typeorm';
import { AccountEntity } from '../repository/Account.entity';
import { DependencyInjection } from '../enum/DependencyInjection';

export const accountProviders = [
  {
    provide: DependencyInjection.ACCOUNT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AccountEntity),
    inject: ['DATA_SOURCE'],
  },
];