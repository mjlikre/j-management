import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { AuthGuard } from 'src/auth/auth.guard'

import { UserService } from './user.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query('user')
  @UseGuards(AuthGuard)
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id)
  }

  @Mutation('updateUser')
  @UseGuards(AuthGuard)
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput)
  }

  @Mutation('removeUser')
  @UseGuards(AuthGuard)
  remove(@Args('id') id: string) {
    return this.userService.remove(id)
  }

  @Mutation('login')
  login(@Args('loginInfo') loginInfo: Omit<CreateUserInput, 'lang'>) {
    return this.userService.validateUser(loginInfo)
  }

  @Mutation('validate')
  @UseGuards(AuthGuard)
  isValid() {
    return this.userService.ifStillValid()
  }
}
