import { HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateWorkerInput } from './dto/create-worker.input'
import { UpdateWorkerInput } from './dto/update-worker.input'
import { WorkerOutput } from './dto/worker.output'
import { IWorkerRepository } from './worker.types'
import { ConfigService } from '@nestjs/config'
import { IEnv } from '../env.types'
import { HttpException } from '@nestjs/common'

@Injectable()
export class WorkerRepository implements IWorkerRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<IEnv>
  ) {}

  async createWorker(data: CreateWorkerInput): Promise<WorkerOutput> {
    const { firstName, lastName, salaryAmount, phone } = data
    try {
      const workerCreated = await this.prismaService.worker.create({
        data: {
          firstName,
          lastName,
          salaryAmount,
          phone,
          debtAmount: 0,
          debtPaymentAmount: 0
        }
      })
      return workerCreated
    } catch (e) {
      throw e
    }
  }

  async getWorker(id: string): Promise<WorkerOutput> {
    const worker = await this.prismaService.worker.findUnique({
      where: { id: id }
    })

    if (!worker) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    return worker
  }

  async getWorkers(): Promise<WorkerOutput[]> {
    const workers = await this.prismaService.worker.findMany()
    return workers
  }

  async deleteWorker(id: string): Promise<WorkerOutput[]> {
    await this.prismaService.worker.delete({
      where: { id: id }
    })
    const workers = await this.prismaService.worker.findMany()
    return workers
  }

  async updateWorker(params: {
    id: string
    data: Omit<UpdateWorkerInput, 'id'>
  }): Promise<WorkerOutput> {
    const { id, data } = params
    const updatedWorker = await this.prismaService.worker.update({
      data,
      where: { id: id }
    })

    return updatedWorker
  }
}
