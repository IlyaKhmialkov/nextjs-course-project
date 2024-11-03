import { Injectable } from '@nestjs/common'
import { MuscleGroup } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'

@Injectable()
export class MuscleGroupsService {
	constructor(private prisma: PrismaService) {}

	getAll(): Promise<MuscleGroup[]> {
		return this.prisma.muscleGroup.findMany()
	}
	get(id: number): Promise<MuscleGroup | null> {
		return this.prisma.muscleGroup.findUnique({
			where: { id },
		})
	}
	getByName(name: string): Promise<MuscleGroup[]> {
		return this.prisma.muscleGroup.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		})
	}
	getExerciseMachinesIdsByNameOfMuscleGroup(name: string): Promise<MuscleGroup[]> {
		return this.prisma.muscleGroup.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
			include: {
				exerciseMachines: {
					select: {
						exerciseMachineId: true,
					},
				},
			},
		})
	}
	create(dto: CreateMuscleGroupDto): Promise<MuscleGroup> {
		return this.prisma.muscleGroup.create({
			data: dto,
		})
	}
	update(id: number, dto: UpdateMuscleGroupDto): Promise<MuscleGroup> {
		return this.prisma.muscleGroup.update({
			where: { id },
			data: dto,
		})
	}
	delete(id: number): Promise<MuscleGroup> {
		return this.prisma.muscleGroup.delete({
			where: { id },
		})
	}
}
