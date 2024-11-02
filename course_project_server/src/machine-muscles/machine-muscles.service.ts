import { Injectable } from '@nestjs/common'
import { MachineMuscle } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class MachineMusclesService {
	constructor(private prisma: PrismaService) {}

	getAllExersiseMachines(muscleGroupId: number): Promise<MachineMuscle[]> {
		return this.prisma.machineMuscle.findMany({
			where: { muscleGroupId },
		})
	}
	getAllMuscleGroups(exersiseMachineId: number): Promise<MachineMuscle[]> {
		return this.prisma.machineMuscle.findMany({
			where: { exersiseMachineId },
		})
	}
	getAllRecords(): Promise<MachineMuscle[]> {
		return this.prisma.machineMuscle.findMany()
	}
	createMachineMuscle(muscleGroupId: number, exersiseMachineId: number): Promise<MachineMuscle> {
		try {
			return this.prisma.machineMuscle.create({
				data: {
					muscleGroupId,
					exersiseMachineId,
				},
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new Error('Duplicate entry. This table is already exist.')
			}
			throw error
		}
	}
	deleteMachineMuscle(muscleGroupId: number, exersiseMachineId: number): Promise<MachineMuscle> {
		try {
			return this.prisma.machineMuscle.delete({
				where: { muscleGroupId_exersiseMachineId: { muscleGroupId, exersiseMachineId } },
			})
		} catch (error) {
			if (error.code === 'P2025') {
				throw new Error('MachineMuscle record not found for the provided IDs.')
			}
			throw error
		}
	}
}
