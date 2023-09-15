import { Global, Module } from '@nestjs/common'
import { ValidateService } from './validate.token.service'

@Global()
@Module({
  providers: [ValidateService],
  exports: [ValidateService]
})
export class AuthModule {}
