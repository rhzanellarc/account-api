import { DataSource } from "typeorm";
import { AccountEntity } from "../repository/Account.entity";

export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [AccountEntity], 
            synchronize: true,
        });
  
        return dataSource.initialize();
      },
    },
  ];