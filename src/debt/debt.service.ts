import { Inject, Injectable } from '@nestjs/common'
import { CreateDebtInput } from './dto/create-debt.input'
import { TYPES } from 'src/app.types'
import { IDebtRepository } from './debt.types'
import { IWorkerRepository } from 'src/worker/worker.types'

@Injectable()
export class DebtService {
  constructor(
    @Inject(TYPES.Debt) private readonly debtRepository: IDebtRepository,
    @Inject(TYPES.Worker) private readonly workerRepository: IWorkerRepository
  ) {}
  async create(createDebtInput: CreateDebtInput) {
    const { amount, workerId } = createDebtInput
    const { debtAmount } = await this.workerRepository.getWorker(workerId)
    const newDebtAmount = debtAmount + amount
    await this.workerRepository.updateWorker({
      id: workerId,
      data: { debtAmount: newDebtAmount }
    })
    await this.debtRepository.createDebt(createDebtInput)
    return this.workerRepository.getWorker(workerId)
  }

  async getWorkerDebts(workerId: string) {
    return await this.debtRepository.getWorkerDebts(workerId)
  }

  async deleteWorkerDebts(workerId: string) {
    return await this.debtRepository.deleteWorkerDebts(workerId)
  }
}
