import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnv } from '../env.types'
import * as jwt from 'jwt-simple'

@Injectable()
export class ValidateService {
  constructor(private readonly configService: ConfigService<IEnv>) {}
  async verifyToken(request: any): Promise<boolean> {
    const token = request.headers.authorization

    if (!token) throw new UnauthorizedException()
    try {
      const secretKey = this.configService.get('SECRET_KEY')
      const payload = jwt.decode(token, secretKey)
      const timeNow = Date.now()
      if (payload && timeNow - payload.iat < 36000000) {
        request.query.userId = payload.sub
        return true
      }

      return false
    } catch (e) {
      return false
    }
  }
}
