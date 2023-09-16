import { Module } from '@nestjs/common'
import { WorkerService } from './worker.service'
import { WorkerResolver } from './worker.resolver'
import { TYPES } from 'src/app.types'
import { WorkerRepository } from './worker.repository'
import { SalaryModule } from 'src/salary/salary.module'
import { DebtModule } from 'src/debt/debt.module'
import { DebtPaymentModule } from 'src/debt-payment/debt-payment.module'

@Module({
  providers: [
    WorkerResolver,
    WorkerService,
    {
      provide: TYPES.Worker,
      useClass: WorkerRepository
    }
  ],
  imports: [SalaryModule, DebtModule, DebtPaymentModule]
})
export class WorkerModule {}
