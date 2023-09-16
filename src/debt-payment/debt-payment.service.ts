import { Inject, Injectable } from '@nestjs/common'
import { CreateDebtPaymentInput } from './dto/create-debt-payment.input'
import { TYPES } from 'src/app.types'
import { IDebtPaymentRepository } from './debt-payment.types'

@Injectable()
export class DebtPaymentService {
  constructor(
    @Inject(TYPES.DebtPayment)
    private readonly debtPaymentRepository: IDebtPaymentRepository
  ) {}
  async create(createDebtPaymentInput: CreateDebtPaymentInput) {
    return await this.debtPaymentRepository.createDebtPayment(
      createDebtPaymentInput
    )
  }

  async getWorkerDebtPayments(workerId: string) {
    return await this.debtPaymentRepository.getWorkerDebtPayments(workerId)
  }
}
