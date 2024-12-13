import { Injectable } from '@nestjs/common'
import { ProgramMachine } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateProgramMachineDto } from './dto/create-program-machine.dto'

@Injectable()
export class ProgramMachinesService {
	constructor(private prisma: PrismaService) {}

	get(dto: CreateProgramMachineDto): Promise<ProgramMachine | null> {
		return this.prisma.programMachine.findUnique({
			where: { trainingProgramId_exerciseMachineId: dto },
		})
	}
	getAllExerciseMachines(trainingProgramId: number): Promise<ProgramMachine[]> {
		return this.prisma.programMachine.findMany({
			where: { trainingProgramId },
			include: {
				exerciseMachine: true,
			},
		})
	}
	getAllTrainingPrograms(exerciseMachineId: number): Promise<ProgramMachine[]> {
		return this.prisma.programMachine.findMany({
			where: { exerciseMachineId },
		})
	}
	getAllRecords(): Promise<ProgramMachine[]> {
		return this.prisma.programMachine.findMany()
	}
	create(dto: CreateProgramMachineDto): Promise<ProgramMachine> {
		return this.prisma.programMachine.create({
			data: dto,
		})
	}
	delete(dto: CreateProgramMachineDto): Promise<ProgramMachine> {
		return this.prisma.programMachine.delete({
			where: { trainingProgramId_exerciseMachineId: dto },
		})
	}
}
