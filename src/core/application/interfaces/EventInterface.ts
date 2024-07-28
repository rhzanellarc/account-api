import EventInputDto from "@app/core/domain/value-object/EventInputDto";
import EventOutputDto from "@app/core/domain/value-object/EventOutputDto";

export default interface EventInterface {
    execute(input: EventInputDto): Promise<EventOutputDto>;
}