import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EventTypeEnum } from "../../enum/EventTypeEnum";

export default class EventRequestInput {
    @ApiProperty({ enum: EventTypeEnum })
    @IsNotEmpty({ message: 'Type is required' })
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    origin?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    destination?: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Amount is required' })
    @IsInt()
    amount: number;
}