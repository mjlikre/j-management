import { CreateSalaryInput } from './dto/create-salary.input'
import { SalaryOutput } from './dto/salary-output'

interface ISalaryRepository {
  createSalary: (data: CreateSalaryInput) => Promise<SalaryOutput | null>
  getWorkerSalaries: (workerId: string) => Promise<SalaryOutput[]>
}

export { ISalaryRepository }
