import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { WorkerService } from './worker.service'
import { CreateWorkerInput } from './dto/create-worker.input'
import { UpdateWorkerInput } from './dto/update-worker.input'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Resolver('Worker')
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Mutation('createWorker')
  @UseGuards(AuthGuard)
  create(@Args('createWorkerInput') createWorkerInput: CreateWorkerInput) {
    return this.workerService.create(createWorkerInput)
  }

  @Query('workers')
  @UseGuards(AuthGuard)
  findAll() {
    return this.workerService.findAll()
  }

  @Query('worker')
  @UseGuards(AuthGuard)
  findOne(@Args('id') id: string) {
    return this.workerService.findOne(id)
  }

  @Mutation('updateWorker')
  @UseGuards(AuthGuard)
  update(@Args('updateWorkerInput') updateWorkerInput: UpdateWorkerInput) {
    return this.workerService.update(updateWorkerInput)
  }

  @Mutation('removeWorker')
  @UseGuards(AuthGuard)
  remove(@Args('id') id: string) {
    return this.workerService.remove(id)
  }

  @Mutation('updateWorkerDebt')
  @UseGuards(AuthGuard)
  updateDebt(@Args('id') id: string) {
    return this.workerService.updateDebt(id)
  }
}
