import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BaseEntity, OneToMany } from 'typeorm';

@Entity({name: 'account'})
export class AccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'account_id'})
    accountId: string;

    @Column({name: 'balance'})
    balance: number;
}
