import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserAuthOutput, UserOutput } from './dto/user.output'

interface IUserRepository {
  createUser: (data: CreateUserInput) => Promise<UserAuthOutput | null>
  getUser: (id: string) => Promise<UserOutput>
  deleteUser: (id: string) => Promise<void>
  updateUser: (params: {
    id: string
    data: Omit<UpdateUserInput, 'id'>
  }) => Promise<UserOutput>
  validateUser: (data: CreateUserInput) => Promise<UserAuthOutput>
  ifStillValid: () => Promise<boolean>
}

export { IUserRepository }
