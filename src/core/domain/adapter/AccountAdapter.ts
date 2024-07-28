import Account from "../entity/Account";
import AccountDto from "../value-object/AccountDto";
import Adapter from "./Adapter";

export default class AccountAdapter implements Adapter<Account, AccountDto> {
    domainToDto(account: Account): AccountDto {
        const dto = new AccountDto();
        dto.balance = account.getBalance();
        dto.id = account.getAccountId();
        return dto;
    }
    dtoToDomain(dto: AccountDto): Account {
        return new Account(dto.id, dto.balance);
    }

}