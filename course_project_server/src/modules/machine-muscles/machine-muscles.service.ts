import { Injectable } from '@nestjs/common'
import { MachineMuscle } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateMachineMuscleDto } from './dto/create-machine-muscle.dto'

@Injectable()
export class MachineMusclesService {
	constructor(private prisma: PrismaService) {}

	get(dto: CreateMachineMuscleDto): Promise<MachineMuscle | null> {
		return this.prisma.machineMuscle.findUnique({
			where: { muscleGroupId_exerciseMachineId: dto },
		})
	}
	getAllExerciseMachines(muscleGroupId: number): Promise<MachineMuscle[]> {
		return this.prisma.machineMuscle.findMany({
			where: { muscleGroupId },
		})
	}
	getAllMuscleGroups(exerciseMachineId: number): Promise<MachineMuscle[]> {
		return this.prisma.machineMuscle.findMany({
			where: { exerciseMachineId },
		})
	}
	getAllRecords(): Promise<MachineMuscle[]> {
		return this.prisma.machineMuscle.findMany()
	}
	create(dto: CreateMachineMuscleDto): Promise<MachineMuscle> {
		return this.prisma.machineMuscle.create({
			data: dto,
		})
	}
	delete(dto: CreateMachineMuscleDto): Promise<MachineMuscle> {
		return this.prisma.machineMuscle.delete({
			where: { muscleGroupId_exerciseMachineId: dto },
		})
	}
}
