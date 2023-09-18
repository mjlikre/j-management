import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'

import { ValidateService } from './validate.token.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly validateService: ValidateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: any = context.switchToHttp().getNext().req
      const payload = await this.validateService.verifyToken(request)
      request['user'] = payload
      return payload
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
