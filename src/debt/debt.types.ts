import { CreateDebtInput } from './dto/create-debt.input'
import { DebtOutput } from './dto/debt.output'

interface IDebtRepository {
  createDebt: (data: CreateDebtInput) => Promise<DebtOutput | null>
  getWorkerDebts: (workerId: string) => Promise<DebtOutput[]>
  deleteWorkerDebts: (workerId: string) => Promise<void>
}

export { IDebtRepository }
