import { Inject, Injectable } from '@nestjs/common'

import { TYPES } from 'src/app.types'
import { DebtService } from 'src/debt/debt.service'
import { DebtPaymentService } from 'src/debt-payment/debt-payment.service'

import { IWorkerRepository } from './worker.types'
import { CreateWorkerInput } from './dto/create-worker.input'
import { UpdateWorkerInput } from './dto/update-worker.input'

@Injectable()
export class WorkerService {
  constructor(
    @Inject(TYPES.Worker) private readonly workerRepository: IWorkerRepository,
    @Inject(DebtService) private readonly debtService: DebtService,
    @Inject(DebtPaymentService)
    private readonly debtPaymentService: DebtPaymentService
  ) {}
  async create(createWorkerInput: CreateWorkerInput) {
    return await this.workerRepository.createWorker(createWorkerInput)
  }

  async findAll() {
    return await this.workerRepository.getWorkers()
  }

  async findOne(id: string) {
    return await this.workerRepository.getWorker(id)
  }

  async update(updateWorkerInput: UpdateWorkerInput) {
    const { id, ...restUpdateWorkerInput } = updateWorkerInput
    return await this.workerRepository.updateWorker({
      id,
      data: restUpdateWorkerInput
    })
  }

  async remove(id: string) {
    return await this.workerRepository.deleteWorker(id)
  }

  async updateDebt(id: string) {
    const debts = await this.debtService.getWorkerDebts(id)
    const debtPayments = await this.debtPaymentService.getWorkerDebtPayments(id)

    const debtAmount = debts.reduce((acc, curr) => {
      return acc + curr.amount
    }, 0)

    const debtPaymentAmount = debtPayments.reduce((acc, curr) => {
      return acc + curr.amount
    }, 0)

    return await this.workerRepository.updateWorker({
      id,
      data: { debtAmount, debtPaymentAmount }
    })
  }

  async getDebt(id: string) {
    return await this.debtService.getWorkerDebts(id)
  }

  async getDebtPayments(id: string) {
    return await this.debtPaymentService.getWorkerDebtPayments(id)
  }
}
