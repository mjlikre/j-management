import { Module } from '@nestjs/common'
import { DebtService } from './debt.service'
import { DebtResolver } from './debt.resolver'
import { TYPES } from 'src/app.types'
import { DebtRepository } from './debt.repository'

@Module({
  providers: [
    DebtResolver,
    DebtService,
    {
      provide: TYPES.Debt,
      useClass: DebtRepository
    }
  ],
  exports: [DebtService]
})
export class DebtModule {}
