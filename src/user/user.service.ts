import { Inject, Injectable } from '@nestjs/common'
import { TYPES } from '../app.types'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { IUserRepository } from './user.types'
import { UserAuthOutput, UserOutput } from './dto/user.output'

@Injectable()
export class UserService {
  constructor(
    @Inject(TYPES.User) private readonly userRepository: IUserRepository
  ) {}

  async create(data: CreateUserInput): Promise<UserAuthOutput | null> {
    return await this.userRepository.createUser(data)
  }

  async findOne(id: string): Promise<UserOutput | null> {
    return await this.userRepository.getUser(id)
  }

  async update(updateUserInput: UpdateUserInput): Promise<UserOutput | null> {
    const { id, ...updateUserData } = updateUserInput
    return await this.userRepository.updateUser({
      id: id,
      data: updateUserData
    })
  }

  async remove(id: string): Promise<void> {
    return await this.userRepository.deleteUser(id)
  }

  async userLogin(data: CreateUserInput): Promise<UserAuthOutput> {
    return await this.userRepository.userLogin(data)
  }
}
