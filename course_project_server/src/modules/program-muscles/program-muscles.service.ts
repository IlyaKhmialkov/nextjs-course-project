import { Injectable } from '@nestjs/common'
import { ProgramMuscle } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateProgramMuscleDto } from './dto/create-program-muscle.dto'

@Injectable()
export class ProgramMusclesService {
	constructor(private prisma: PrismaService) {}

	get(dto: CreateProgramMuscleDto): Promise<ProgramMuscle | null> {
		return this.prisma.programMuscle.findUnique({
			where: { trainingProgramId_muscleGroupId: dto },
		})
	}
	getAllTrainingPrograms(muscleGroupId: number): Promise<ProgramMuscle[]> {
		return this.prisma.programMuscle.findMany({
			where: { muscleGroupId },
		})
	}
	getAllMuscleGroups(trainingProgramId: number): Promise<ProgramMuscle[]> {
		return this.prisma.programMuscle.findMany({
			where: { trainingProgramId },
			include: {
				muscleGroup: true,
			},
		})
	}
	getAllRecords(): Promise<ProgramMuscle[]> {
		return this.prisma.programMuscle.findMany()
	}
	create(dto: CreateProgramMuscleDto): Promise<ProgramMuscle> {
		return this.prisma.programMuscle.create({
			data: dto,
		})
	}
	delete(dto: CreateProgramMuscleDto): Promise<ProgramMuscle> {
		return this.prisma.programMuscle.delete({
			where: { trainingProgramId_muscleGroupId: dto },
		})
	}
}
