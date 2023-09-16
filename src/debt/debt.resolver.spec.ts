import { Test, TestingModule } from '@nestjs/testing'
import { DebtResolver } from './debt.resolver'
import { DebtService } from './debt.service'

describe('DebtResolver', () => {
  let resolver: DebtResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtResolver, DebtService]
    }).compile()

    resolver = module.get<DebtResolver>(DebtResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
