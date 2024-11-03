import { Injectable } from '@nestjs/common'
import { ExerciseMachine } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateExerciseMachineDto } from './dto/create-exercise-machines.dto'
import { UpdateExerciseMachineDto } from './dto/update-exercise-machines.dto'

@Injectable()
export class ExerciseMachinesService {
	constructor(private prisma: PrismaService) {}

	getAll(): Promise<ExerciseMachine[]> {
		return this.prisma.exerciseMachine.findMany()
	}
	get(id: number): Promise<ExerciseMachine | null> {
		return this.prisma.exerciseMachine.findUnique({
			where: { id },
		})
	}
	getByName(name: string): Promise<ExerciseMachine[]> {
		return this.prisma.exerciseMachine.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		})
	}
	create(dto: CreateExerciseMachineDto): Promise<ExerciseMachine> {
		return this.prisma.exerciseMachine.create({
			data: dto,
		})
	}
	update(id: number, dto: UpdateExerciseMachineDto): Promise<ExerciseMachine> {
		return this.prisma.exerciseMachine.update({
			where: { id },
			data: dto,
		})
	}
	delete(id: number): Promise<ExerciseMachine> {
		return this.prisma.exerciseMachine.delete({
			where: { id },
		})
	}
}
