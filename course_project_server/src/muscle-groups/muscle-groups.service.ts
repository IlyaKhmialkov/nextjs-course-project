import { Injectable } from '@nestjs/common'
import { MuscleGroup } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class MuscleGroupsService {
	constructor(private prisma: PrismaService) {}

	getAllMuscleGroups(): Promise<MuscleGroup[]> {
		return this.prisma.muscleGroup.findMany()
	}
	getMuscleGroup(id: number): Promise<MuscleGroup | null> {
		return this.prisma.muscleGroup.findUnique({
			where: { id },
		})
	}
	getMuscleGroupsByName(name: string): Promise<MuscleGroup[]> {
		return this.prisma.muscleGroup.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		})
	}
	getExersiseMachinesIdsByNameOfMuscleGroup(name: string): Promise<MuscleGroup[]> {
		return this.prisma.muscleGroup.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
			include: {
				exersiseMachines: {
					select: {
						exersiseMachineId: true,
					},
				},
			},
		})
	}
	createMuscleGroup(name: string): Promise<MuscleGroup> {
		try {
			return this.prisma.muscleGroup.create({
				data: {
					name,
				},
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new Error('Duplicate entry. This name is already taken.')
			}
			throw error
		}
	}
	updateMuscleGroup(id: number, name: string): Promise<MuscleGroup> {
		try {
			return this.prisma.muscleGroup.update({
				where: { id },
				data: { name },
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new Error('Duplicate entry. This name is already taken.')
			}
			throw error
		}
	}
	deleteMuscleGroup(id: number): Promise<MuscleGroup> {
		return this.prisma.muscleGroup.delete({
			where: { id },
		})
	}
}
