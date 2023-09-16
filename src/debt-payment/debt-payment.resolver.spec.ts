import { Test, TestingModule } from '@nestjs/testing'
import { DebtPaymentResolver } from './debt-payment.resolver'
import { DebtPaymentService } from './debt-payment.service'

describe('DebtPaymentResolver', () => {
  let resolver: DebtPaymentResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtPaymentResolver, DebtPaymentService]
    }).compile()

    resolver = module.get<DebtPaymentResolver>(DebtPaymentResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
