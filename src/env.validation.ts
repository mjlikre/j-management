import { ConfigModule } from '@nestjs/config'
import { plainToClass } from 'class-transformer'
import {
  IsDefined,
  IsNumber,
  IsString,
  IsUrl,
  validateSync
} from 'class-validator'
import { IEnv } from './env.types'

export class EnvironmentVariables implements IEnv {
  /* General ENV */
  @IsString() @IsDefined() PROJECT_NAME: string
  @IsDefined() SECRET_KEY: string
  /* Database ENV */
  @IsDefined()
  @IsUrl({ protocols: ['postgresql'], require_tld: false, require_port: true })
  DATABASE_URL: string

  @IsDefined() DB_AUTH: string
  @IsDefined() @IsNumber() DB_PORT: number
  @IsDefined() DB_HOST: string
  @IsDefined() DB: string
}

export function validateEnv(
  config: Record<string, unknown>
): EnvironmentVariables {
  const validateConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
    stopAtFirstError: true,
    forbidUnknownValues: true
  })

  if (errors.length > 0) {
    const parsedErrors = errors.flatMap(error =>
      Object.values(error.constraints ?? {})
    )
    const beautifiedErrors = parsedErrors.toString().replace(/,/g, '\n * ')
    throw new Error(`ENV vallidation failed \n * ${beautifiedErrors} \n`)
  }

  return validateConfig
}

export const EnvValidation = ConfigModule.forRoot({
  validate: validateEnv,
  isGlobal: true,
  cache: true,
  expandVariables: true
})
