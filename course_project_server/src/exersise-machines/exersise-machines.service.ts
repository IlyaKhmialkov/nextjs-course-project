import { Injectable } from '@nestjs/common'
import { ExersiseMachine } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ExersiseMachinesService {
	constructor(private prisma: PrismaService) {}

	async getAllExersiseMachines(): Promise<ExersiseMachine[]> {
		return this.prisma.exersiseMachine.findMany()
	}
	async getExersiseMachine(id: number): Promise<ExersiseMachine | null> {
		return this.prisma.exersiseMachine.findUnique({
			where: { id },
		})
	}
	async getExersiseMachinesByName(name: string): Promise<ExersiseMachine[]> {
		return this.prisma.exersiseMachine.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		})
	}
	async createExersiseMachine(name: string, amount: number, pictureLink: string): Promise<ExersiseMachine> {
		try {
			return this.prisma.exersiseMachine.create({
				data: {
					name,
					amount,
					pictureLink,
				},
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new Error('Duplicate entry. This name is already taken.')
			}
			throw error
		}
	}
	async updateExersiseMachine(id: number, name: string, amount: number, pictureLink: string): Promise<ExersiseMachine> {
		try {
			return this.prisma.exersiseMachine.update({
				where: { id },
				data: { name, amount, pictureLink },
			})
		} catch (error) {
			if (error.code === 'P2002') {
				throw new Error('Duplicate entry. This name is already taken.')
			}
			throw error
		}
	}
	async deleteExersiseMachine(id: number): Promise<ExersiseMachine> {
		return this.prisma.exersiseMachine.delete({
			where: { id },
		})
	}
}
