import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { AuthGuard } from 'src/auth/auth.guard'

import { UserService } from './user.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { IncomingMessage, ServerResponse } from 'http'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput)
  }

  @Query('user')
  @UseGuards(AuthGuard)
  async findOne(@Args('id') id: string) {
    return await this.userService.findOne(id)
  }

  @Mutation('updateUser')
  @UseGuards(AuthGuard)
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput)
  }

  @Mutation('removeUser')
  @UseGuards(AuthGuard)
  async remove(@Args('id') id: string) {
    return await this.userService.remove(id)
  }

  @Mutation('login')
  async login(
    @Context() context: { req: IncomingMessage; res: ServerResponse },
    @Args('loginInput') loginInput: Omit<CreateUserInput, 'lang'>
  ) {
    const userAuth = await this.userService.userLogin(loginInput)
    if (userAuth) {
      context.res.setHeader('Set-Cookie', `J_COOKIE=${userAuth.token}`)
    }

    return userAuth
  }

  @Query('validateUser')
  @UseGuards(AuthGuard)
  async validateUser(
    @Context() context: { req: IncomingMessage & { user: { sub: string } } }
  ) {
    const { sub: userId } = context.req.user
    return await this.userService.findOne(userId)
  }
}
