import { Inject, Injectable } from '@nestjs/common'
import { CreateSalaryInput } from './dto/create-salary.input'
import { TYPES } from 'src/app.types'
import { ISalaryRepository } from './salary.types'

@Injectable()
export class SalaryService {
  constructor(
    @Inject(TYPES.Salary) private readonly salaryRepository: ISalaryRepository
  ) {}
  async create(createSalaryInput: CreateSalaryInput) {
    return await this.salaryRepository.createSalary(createSalaryInput)
  }

  async getWorkerSalaries(workerId: string) {
    return await this.salaryRepository.getWorkerSalaries(workerId)
  }
}
