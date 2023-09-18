import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jwt-simple'

import { IEnv } from '../env.types'

@Injectable()
export class ValidateService {
  constructor(private readonly configService: ConfigService<IEnv>) {}
  async verifyToken(request: any): Promise<boolean> {
    const cookieKey = 'J_COOKIE'
    const token = request.cookies?.[cookieKey]
    if (!token) throw new UnauthorizedException()
    try {
      const secretKey = this.configService.get('SECRET_KEY')
      const payload = jwt.decode(token, secretKey)
      const timeNow = Date.now()
      if (payload && timeNow - payload.iat < 36000000) {
        request.query.userId = payload.sub
        return payload
      }

      return false
    } catch (e) {
      return false
    }
  }
}
