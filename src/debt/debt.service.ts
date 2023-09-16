import { Inject, Injectable } from '@nestjs/common'
import { CreateDebtInput } from './dto/create-debt.input'
import { TYPES } from 'src/app.types'
import { IDebtRepository } from './debt.types'

@Injectable()
export class DebtService {
  constructor(
    @Inject(TYPES.Debt) private readonly debtRepository: IDebtRepository
  ) {}
  async create(createDebtInput: CreateDebtInput) {
    return await this.debtRepository.createDebt(createDebtInput)
  }

  async getWorkerDebts(workerId: string) {
    return await this.debtRepository.getWorkerDebts(workerId)
  }
}
