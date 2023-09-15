import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  userName: string

  @IsNotEmpty()
  password: string

  lang?: string
}
