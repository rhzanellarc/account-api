import { Controller, Get, Inject, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { DependencyInjection } from '../enum/DependencyInjection';
import Balance from '@app/core/application/Balance';
import AccountNotFoundError from '@app/core/domain/errors/AccountNotFoundError';
import InvalidParametersError from '@app/core/domain/errors/InvalidParametersError';

@Controller('/balance')
export class BalanceController {
  constructor(
    @Inject(DependencyInjection.BALANCE)
    readonly useCase: Balance
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get the balance of an account.' })
  async event(@Query('account_id') accountId: string, @Res() res: Response): Promise<any> {
    try {
      const balance = await this.useCase.execute(accountId)
      return res.status(200).json(balance);
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return res.status(404).send();
      } else if (error instanceof InvalidParametersError) {
        return res.status(400).send(error.message);
      } 
      return res.status(500).send('An unexpected Error ocurred.');
    }
  }
}
