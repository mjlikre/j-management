import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSalaryInput } from './dto/create-salary.input'
import { SalaryOutput } from './dto/salary-output'
import { ISalaryRepository } from './salary.types'

@Injectable()
export class SalaryRepository implements ISalaryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createSalary(data: CreateSalaryInput): Promise<SalaryOutput> {
    try {
      const debtCreated = await this.prismaService.salary.create({
        data
      })
      return debtCreated
    } catch (e: any) {
      throw e
    }
  }

  async getWorkerSalaries(workerId: string): Promise<SalaryOutput[]> {
    const debts = await this.prismaService.salary.findMany({
      where: { workerId }
    })
    return debts
  }
}
