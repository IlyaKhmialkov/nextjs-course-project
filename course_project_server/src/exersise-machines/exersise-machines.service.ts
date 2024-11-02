import { Injectable } from '@nestjs/common'
import { ExersiseMachine } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ExersiseMachinesService {
	constructor(private prisma: PrismaService) {}

	getAllExersiseMachines(): Promise<ExersiseMachine[]> {
		return this.prisma.exersiseMachine.findMany()
	}
	getExersiseMachine(id: number): Promise<ExersiseMachine | null> {
		return this.prisma.exersiseMachine.findUnique({
			where: { id },
		})
	}
	getExersiseMachinesByName(name: string): Promise<ExersiseMachine[]> {
		return this.prisma.exersiseMachine.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		})
	}
	createExersiseMachine(
		name: string,
		amount: number,
		pictureLink: string,
		description: string
	): Promise<ExersiseMachine> {
		try {
			return this.prisma.exersiseMachine.create({
				data: {
					name,
					amount,
					pictureLink,
					description,
				},
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new Error('Duplicate entry. This name is already taken.')
			}
			throw error
		}
	}
	updateExersiseMachine(
		id: number,
		name: string,
		amount: number,
		pictureLink: string,
		description: string
	): Promise<ExersiseMachine> {
		try {
			return this.prisma.exersiseMachine.update({
				where: { id },
				data: { name, amount, pictureLink, description },
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new Error('Duplicate entry. This name is already taken.')
			}
			throw error
		}
	}
	deleteExersiseMachine(id: number): Promise<ExersiseMachine> {
		return this.prisma.exersiseMachine.delete({
			where: { id },
		})
	}
}
