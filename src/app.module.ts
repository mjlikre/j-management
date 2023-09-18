import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { EnvValidation } from './env.validation'
import { CustomDateScalar } from './resources/date-scalar'
import { CustomUuidScalar } from './resources/uuid-scalar'

import { UserModule } from './user/user.module'
import { WorkerModule } from './worker/worker.module'
import { DebtModule } from './debt/debt.module'
import { SalaryModule } from './salary/salary.module'
import { DebtPaymentModule } from './debt-payment/debt-payment.module'
import { IncomingMessage, ServerResponse } from 'http'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({
        res,
        req
      }: {
        req: IncomingMessage
        res: ServerResponse
      }) => {
        return { res, req }
      },
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
      resolvers: { DATE: CustomDateScalar, UUID: CustomUuidScalar }
    }),
    EnvValidation,
    AuthModule,
    PrismaModule,
    UserModule,
    WorkerModule,
    DebtModule,
    SalaryModule,
    DebtPaymentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
