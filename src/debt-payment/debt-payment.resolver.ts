import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { DebtPaymentService } from './debt-payment.service'
import { CreateDebtPaymentInput } from './dto/create-debt-payment.input'

@Resolver('DebtPayment')
export class DebtPaymentResolver {
  constructor(private readonly debtPaymentService: DebtPaymentService) {}

  @Mutation('createDebtPayment')
  create(
    @Args('createDebtPaymentInput')
    createDebtPaymentInput: CreateDebtPaymentInput
  ) {
    return this.debtPaymentService.create(createDebtPaymentInput)
  }

  @Query('getWorkerDebtPayments')
  getWorkerDebtPayments(workerId: string) {
    return this.debtPaymentService.getWorkerDebtPayments(workerId)
  }
}
