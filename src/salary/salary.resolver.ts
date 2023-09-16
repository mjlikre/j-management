import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SalaryService } from './salary.service'
import { CreateSalaryInput } from './dto/create-salary.input'

@Resolver('Salary')
export class SalaryResolver {
  constructor(private readonly salaryService: SalaryService) {}

  @Mutation('createSalary')
  create(@Args('createSalaryInput') createSalaryInput: CreateSalaryInput) {
    return this.salaryService.create(createSalaryInput)
  }

  @Query('getWorkerSalaries')
  getWorkerSalaries(workerId: string) {
    return this.salaryService.getWorkerSalaries(workerId)
  }
}
