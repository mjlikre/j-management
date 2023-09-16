import { Module } from '@nestjs/common'
import { DebtPaymentService } from './debt-payment.service'
import { DebtPaymentResolver } from './debt-payment.resolver'
import { TYPES } from 'src/app.types'
import { DebtPaymentRepository } from './debt-payment.repository'

@Module({
  providers: [
    DebtPaymentResolver,
    DebtPaymentService,
    {
      provide: TYPES.DebtPayment,
      useClass: DebtPaymentRepository
    }
  ],
  exports: [DebtPaymentService]
})
export class DebtPaymentModule {}
