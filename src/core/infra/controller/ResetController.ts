import { Body, Controller, Get, Inject, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import Withdraw from '@app/core/application/Withdraw';
import { DependencyInjection } from '../enum/DependencyInjection';
import EventStrategyFactory from '../factory/EventStrategyFactory';
import EventInputDto from '@app/core/domain/value-object/EventInputDto';
import Reset from '@app/core/application/Reset';

@Controller('/reset')
export class ResetController {
  constructor(
    @Inject(DependencyInjection.RESET)
    readonly useCase: Reset
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new entity' })
  async event(@Res() response: Response): Promise<any> {
    this.useCase.execute()
    return response.status(200).send('OK');
  }
}
