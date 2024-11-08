import { Injectable } from '@nestjs/common'
import { Subscription } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'

@Injectable()
export class SubscriptionsService {
	constructor(private prisma: PrismaService) {}

	getAll(): Promise<Subscription[]> {
		return this.prisma.subscription.findMany()
	}
	get(id: number): Promise<Subscription | null> {
		return this.prisma.subscription.findUnique({
			where: { id },
		})
	}
	getByName(name: string): Promise<Subscription[]> {
		return this.prisma.subscription.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		})
	}
	create(dto: CreateSubscriptionDto): Promise<Subscription> {
		return this.prisma.subscription.create({
			data: dto,
		})
	}
	update(id: number, dto: UpdateSubscriptionDto): Promise<Subscription> {
		return this.prisma.subscription.update({
			where: { id },
			data: dto,
		})
	}
	delete(id: number): Promise<Subscription> {
		return this.prisma.subscription.delete({
			where: { id },
		})
	}
}
