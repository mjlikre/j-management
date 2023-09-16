import { Module } from '@nestjs/common'
import { TYPES } from 'src/app.types'

import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserRepository } from './user.repository'

@Module({
  providers: [
    UserResolver,
    UserService,
    {
      provide: TYPES.User,
      useClass: UserRepository
    }
  ]
})
export class UserModule {}
