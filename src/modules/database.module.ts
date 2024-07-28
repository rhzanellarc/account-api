import { databaseProviders } from '@app/core/infra/database/database.provider';
import { accountProviders } from '@app/core/infra/database/providers';
import { AccountEntity } from '@app/core/infra/repository/Account.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports: [
    ...databaseProviders,
  ],
  providers: [...databaseProviders, ...accountProviders],
})
export class DataseModule {}
