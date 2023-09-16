import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateDebtInput {
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsNotEmpty()
  workerId: string
}
