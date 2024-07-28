import AccountDto from "./AccountDto";

export default class EventOutputDto {
    destination?: AccountDto;
    origin?: AccountDto;

    setDestination(destination: AccountDto) {
        this.destination = destination;
    }

    setOrigin(origin: AccountDto) {
        this.origin = origin;
    }
}
