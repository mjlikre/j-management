import { IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateUserInput {
  @IsNotEmpty()
  @IsUUID()
  id: string

  password?: string

  lang?: string

  access?: string
}
