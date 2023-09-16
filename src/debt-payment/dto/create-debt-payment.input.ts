import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateDebtPaymentInput {
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsNotEmpty()
  workerId: string
}
