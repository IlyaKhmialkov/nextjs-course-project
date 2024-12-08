import { Injectable } from '@nestjs/common'
import { Trainer } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateTrainerDto } from './dto/create-trainer.dto'
import { UpdateTrainerDto } from './dto/update-trainer.dto'

@Injectable()
export class TrainersService {
	constructor(private prisma: PrismaService) {}

	getAll(): Promise<Trainer[]> {
		return this.prisma.trainer.findMany()
	}
	get(id: number): Promise<Trainer | null> {
		return this.prisma.trainer.findUnique({
			where: { id },
		})
	}
	create(dto: CreateTrainerDto): Promise<Trainer> {
		return this.prisma.trainer.create({
			data: { ...dto, picture: 'trainers/mypfp.jpg' }, // CHANGE LINK
		})
	}
	update(id: number, dto: UpdateTrainerDto, passwordHash?: string): Promise<Trainer> {
		return this.prisma.trainer.update({
			where: { id },
			data: { ...dto, passwordHash },
		})
	}
	delete(id: number): Promise<Trainer> {
		return this.prisma.trainer.delete({
			where: { id },
		})
	}
}
