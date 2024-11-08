import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ExerciseMachinesController } from './exercise-machines.controller'
import { ExerciseMachinesService } from './exercise-machines.service'

@Module({
	controllers: [ExerciseMachinesController],
	providers: [ExerciseMachinesService, PrismaService],
})
export class ExerciseMachinesModule {}
