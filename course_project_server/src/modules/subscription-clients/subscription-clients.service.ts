import { Injectable } from '@nestjs/common'
import { SubscriptionClient } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateSubscriptionClientDto } from './dto/create-subscription-client.dto'

@Injectable()
export class SubscriptionClientsService {
	constructor(private prisma: PrismaService) {}

	get(dto: CreateSubscriptionClientDto): Promise<SubscriptionClient | null> {
		return this.prisma.subscriptionClient.findUnique({
			where: { subscriptionId_clientId: dto },
		})
	}
	getAllClients(subscriptionId: number): Promise<SubscriptionClient[]> {
		return this.prisma.subscriptionClient.findMany({
			where: { subscriptionId },
		})
	}
	getAllSubscriptions(clientId: number): Promise<SubscriptionClient[]> {
		return this.prisma.subscriptionClient.findMany({
			where: { clientId },
		})
	}
	getAllRecords(): Promise<SubscriptionClient[]> {
		return this.prisma.subscriptionClient.findMany()
	}
	create(dto: CreateSubscriptionClientDto): Promise<SubscriptionClient> {
		return this.prisma.subscriptionClient.create({
			data: dto,
		})
	}
	delete(dto: CreateSubscriptionClientDto): Promise<SubscriptionClient> {
		return this.prisma.subscriptionClient.delete({
			where: { subscriptionId_clientId: dto },
		})
	}
}
