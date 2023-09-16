import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateWorkerInput {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  @IsNumber()
  salaryAmount: number

  phone: string
}
