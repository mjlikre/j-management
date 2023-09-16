import { IsNumber, IsNotEmpty } from 'class-validator'

export class CreateSalaryInput {
  @IsNumber()
  @IsNotEmpty()
  salaryAmount: number

  @IsNumber()
  @IsNotEmpty()
  salaryPaid: number

  @IsNotEmpty()
  workerId: string
}
