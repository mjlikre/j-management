import { CreateDebtPaymentInput } from './dto/create-debt-payment.input'
import { DebtPaymentOutput } from './dto/debt-payment.output'

interface IDebtPaymentRepository {
  createDebtPayment: (
    data: CreateDebtPaymentInput
  ) => Promise<DebtPaymentOutput | null>
  getWorkerDebtPayments: (workerId: string) => Promise<DebtPaymentOutput[]>
}

export { IDebtPaymentRepository }
