import { CreateWorkerInput } from './create-worker.input'
import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateWorkerInput extends PartialType(CreateWorkerInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string

  salaryAmount?: number
  debtAmount?: number
  debtPaymentAmount?: number
}
