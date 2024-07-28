import { Body, Controller, Get, Inject, Param, Post, Query, Res } from '@nestjs/common';
import EventRequestInput from './input/EventRequestInput';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import Withdraw from '@app/core/application/Withdraw';
import { DependencyInjection } from '../enum/DependencyInjection';
import EventStrategyFactory from '../factory/EventStrategyFactory';
import EventInputDto from '@app/core/domain/value-object/EventInputDto';
import AccountNotFoundError from '@app/core/domain/errors/AccountNotFoundError';
import InvalidParametersError from '@app/core/domain/errors/InvalidParametersError';
import InsufficientBalanceError from '@app/core/domain/errors/InsufficientBalanceError';

@Controller('/event')
export class EventController {
  constructor(
    @Inject(DependencyInjection.EVENT_STRATEGY_FACTORY)
    readonly strategy: EventStrategyFactory
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new entity' })
  async event(@Body() input: EventRequestInput, @Res() response: Response): Promise<any> {
    try {
      const eventInput = this.createInputDto(input);
      const strategy = this.strategy.create(eventInput);
      const res = await strategy.execute(eventInput);
      return response.status(201).json(res);
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return response.status(404).send();
      } else if (error instanceof InvalidParametersError) {
        return response.status(400).send(error.message);
      } else if (error instanceof InsufficientBalanceError) {
        return response.status(400).send('Insufficient balance.');
      } 
      return response.status(500).send('An unexpected Error ocurred.');
    }
  }

  private createInputDto(input: EventRequestInput): EventInputDto {
    const eventInput = new EventInputDto();
    eventInput.type = input.type;
    eventInput.origin = input.origin;
    eventInput.destination = input.destination;
    eventInput.amount = input.amount;
    return eventInput;
  }
}
