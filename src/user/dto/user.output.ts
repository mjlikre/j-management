import { User } from '@prisma/client'

interface UserAuthOutput {
  token: string
  id: string
  lang: string
}

type UserOutput = User

export { UserAuthOutput, UserOutput }
