import { Injectable } from '@nestjs/common'
import { TrainingProgram } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateTrainingProgramDto } from './dto/create-training-program.dto'
import { UpdateTrainingProgramDto } from './dto/update-training-program.dto'

@Injectable()
export class TrainingProgramsService {
	constructor(private prisma: PrismaService) {}

	getAll(): Promise<TrainingProgram[]> {
		return this.prisma.trainingProgram.findMany()
	}
	get(id: number): Promise<TrainingProgram | null> {
		return this.prisma.trainingProgram.findUnique({
			where: { id },
		})
	}
	getByClientId(clientId: number): Promise<TrainingProgram[]> {
		return this.prisma.trainingProgram.findMany({
			where: { clientId },
		})
	}
	create(dto: CreateTrainingProgramDto): Promise<TrainingProgram> {
		return this.prisma.trainingProgram.create({
			data: dto,
		})
	}
	update(id: number, dto: UpdateTrainingProgramDto): Promise<TrainingProgram> {
		return this.prisma.trainingProgram.update({
			where: { id },
			data: dto,
		})
	}
	delete(id: number): Promise<TrainingProgram> {
		return this.prisma.trainingProgram.delete({
			where: { id },
		})
	}
}
