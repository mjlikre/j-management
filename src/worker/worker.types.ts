import { CreateWorkerInput } from './dto/create-worker.input'
import { UpdateWorkerInput } from './dto/update-worker.input'
import { WorkerOutput } from './dto/worker.output'

export interface IWorkerRepository {
  createWorker: (data: CreateWorkerInput) => Promise<WorkerOutput | null>
  getWorker: (id: string) => Promise<WorkerOutput>
  getWorkers: () => Promise<WorkerOutput[]>
  deleteWorker: (id: string) => Promise<void>
  updateWorker: (params: {
    id: string
    data: Omit<UpdateWorkerInput, 'id'>
  }) => Promise<WorkerOutput>
}
