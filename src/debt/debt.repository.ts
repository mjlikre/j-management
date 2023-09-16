import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateDebtInput } from './dto/create-debt.input'
import { DebtOutput } from './dto/debt.output'
import { IDebtRepository } from './debt.types'

@Injectable()
export class DebtRepository implements IDebtRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createDebt(data: CreateDebtInput): Promise<DebtOutput> {
    try {
      const debtCreated = await this.prismaService.debt.create({
        data
      })
      return debtCreated
    } catch (e: any) {
      throw e
    }
  }

  async getWorkerDebts(workerId: string): Promise<DebtOutput[]> {
    const debts = await this.prismaService.debt.findMany({
      where: { workerId }
    })
    return debts
  }
}
