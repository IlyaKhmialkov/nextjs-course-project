import { Injectable } from '@nestjs/common'
import { ExerciseMachine, MuscleGroup } from '@prisma/client'
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
	async getExerciseMachinesByNameOfMuscleGroup(name: string): Promise<ExerciseMachine[]> {
		const muscleGroups = await this.prisma.muscleGroup.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
			include: {
				exerciseMachines: {
					include: {
						exerciseMachine: true,
					},
				},
			},
		})
		const exerciseMachines: ExerciseMachine[] = []
		const existedIds: number[] = []
		muscleGroups.forEach(muscleGroup => {
			muscleGroup.exerciseMachines.forEach(exerciseMachine => {
				if (!existedIds.includes(exerciseMachine.exerciseMachine.id)) {
					existedIds.push(exerciseMachine.exerciseMachine.id)
					exerciseMachines.push(exerciseMachine.exerciseMachine)
				}
			})
		})
		return exerciseMachines
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
