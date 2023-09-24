import { Inject, Injectable } from '@nestjs/common'
import { CreateDebtPaymentInput } from './dto/create-debt-payment.input'
import { TYPES } from 'src/app.types'
import { IDebtPaymentRepository } from './debt-payment.types'
import { IWorkerRepository } from 'src/worker/worker.types'

@Injectable()
export class DebtPaymentService {
  constructor(
    @Inject(TYPES.DebtPayment)
    private readonly debtPaymentRepository: IDebtPaymentRepository,
    @Inject(TYPES.Worker)
    private readonly workerRepository: IWorkerRepository
  ) {}
  async create(createDebtPaymentInput: CreateDebtPaymentInput) {
    const { amount, workerId } = createDebtPaymentInput

    const { debtPaymentAmount } = await this.workerRepository.getWorker(
      workerId
    )
    const newDebtPaymentAmount = debtPaymentAmount + amount
    await this.debtPaymentRepository.createDebtPayment(createDebtPaymentInput)
    await this.workerRepository.updateWorker({
      id: workerId,
      data: {
        debtPaymentAmount: newDebtPaymentAmount
      }
    })
    return this.workerRepository.getWorker(workerId)
  }

  async getWorkerDebtPayments(workerId: string) {
    return await this.debtPaymentRepository.getWorkerDebtPayments(workerId)
  }
}
