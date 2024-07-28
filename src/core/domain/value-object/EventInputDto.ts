import AccountDto from "./AccountDto";

export default class EventInputDto {
    type: string;
    origin?: string;
    destination?: string;
    amount: number;

    setType(type: string) {
        this.type = type;
    }

    setDestination(destination: string) {
        this.destination = destination;
    }

    setOrigin(origin: string) {
        this.origin = origin;
    }

    setAmount(amount: number) {
        this.amount = amount;
    }


}
