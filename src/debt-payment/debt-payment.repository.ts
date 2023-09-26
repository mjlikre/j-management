import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateDebtPaymentInput } from './dto/create-debt-payment.input'
import { DebtPaymentOutput } from './dto/debt-payment.output'
import { IDebtPaymentRepository } from './debt-payment.types'

@Injectable()
export class DebtPaymentRepository implements IDebtPaymentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createDebtPayment(
    data: CreateDebtPaymentInput
  ): Promise<DebtPaymentOutput> {
    try {
      const debtCreated = await this.prismaService.debtPayment.create({
        data
      })
      return debtCreated
    } catch (e: any) {
      throw e
    }
  }

  async getWorkerDebtPayments(workerId: string): Promise<DebtPaymentOutput[]> {
    const debts = await this.prismaService.debtPayment.findMany({
      where: { workerId }
    })
    return debts
  }

  async deleteWorkerDebtPayments(workerId: string): Promise<void> {
    await this.prismaService.debtPayment.deleteMany({
      where: { workerId }
    })
  }
}
