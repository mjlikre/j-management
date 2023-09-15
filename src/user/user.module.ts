import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserRepository } from './user.repository'
import { TYPES } from 'src/app.types'

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
