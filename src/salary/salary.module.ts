import { Module } from '@nestjs/common'

import { TYPES } from 'src/app.types'

import { SalaryService } from './salary.service'
import { SalaryResolver } from './salary.resolver'
import { SalaryRepository } from './salary.repository'

@Module({
  providers: [
    SalaryResolver,
    SalaryService,
    {
      provide: TYPES.Salary,
      useClass: SalaryRepository
    }
  ],
  exports: [SalaryService]
})
export class SalaryModule {}
