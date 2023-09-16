import { HttpStatus, Injectable } from '@nestjs/common'
import { HttpException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jwt-simple'
import * as bcrypt from 'bcryptjs'

import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserAuthOutput, UserOutput } from './dto/user.output'
import { IUserRepository } from './user.types'
import { IEnv } from '../env.types'
import { hashPassword } from './util'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<IEnv>
  ) {}

  async createUser(data: CreateUserInput): Promise<UserAuthOutput> {
    const { userName, password } = data
    try {
      const user = await this.prismaService.user.findFirst({
        where: { userName: userName }
      })
      if (user) {
        throw new HttpException(
          'User Already Exists',
          HttpStatus.UNPROCESSABLE_ENTITY
        )
      }
      const hashedPassword = await hashPassword(password)
      const userCreated = await this.prismaService.user.create({
        data: { userName: userName, password: hashedPassword as any }
      })
      return await this.tokenForUser(userCreated.id)
    } catch (e) {
      throw e
    }
  }

  async getUser(id: string): Promise<UserOutput> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id }
    })

    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    return user
  }

  async deleteUser(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id: id }
    })
  }

  async updateUser(params: {
    id: string
    data: Omit<UpdateUserInput, 'id'>
  }): Promise<UserOutput> {
    const { id, data } = params
    const updatedUser = await this.prismaService.user.update({
      data,
      where: { id: id }
    })

    return {
      ...(await this.tokenForUser(updatedUser.id)),
      lang: updatedUser.lang
    }
  }

  async tokenForUser(id: string): Promise<any> {
    const timestamp = new Date().getTime()
    const secretKey = this.configService.get('SECRET_KEY')
    try {
      return { token: jwt.encode({ sub: id, iat: timestamp }, secretKey), id }
    } catch (e) {
      return e
    }
  }

  async validateUser(data: CreateUserInput): Promise<UserAuthOutput> {
    const { userName, password } = data
    const user = await this.prismaService.user.findFirst({
      where: { userName: userName }
    })
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      throw new HttpException('Password did not match', HttpStatus.UNAUTHORIZED)
    return {
      ...(await this.tokenForUser(user.id)),
      lang: user.lang
    }
  }

  async ifStillValid(): Promise<boolean> {
    return true
  }
}
