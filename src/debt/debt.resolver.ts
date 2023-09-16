import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import { DebtService } from './debt.service'
import { CreateDebtInput } from './dto/create-debt.input'

@Resolver('Debt')
export class DebtResolver {
  constructor(private readonly debtService: DebtService) {}

  @Mutation('createDebt')
  create(@Args('createDebtInput') createDebtInput: CreateDebtInput) {
    return this.debtService.create(createDebtInput)
  }

  @Query('getWorkerDebts')
  getWorkerDebts(@Args('workerId') workerId: string) {
    return this.debtService.getWorkerDebts(workerId)
  }
}
