import { Injectable } from '@nestjs/common'
import { Client } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@Injectable()
export class ClientsService {
	constructor(private prisma: PrismaService) {}

	getAll(): Promise<Client[]> {
		return this.prisma.client.findMany()
	}
	get(id: number): Promise<Client | null> {
		return this.prisma.client.findUnique({
			where: { id },
		})
	}
	create(dto: CreateClientDto): Promise<Client> {
		return this.prisma.client.create({
			data: dto,
		})
	}
	update(id: number, dto: UpdateClientDto, passwordHash?: string): Promise<Client> {
		return this.prisma.client.update({
			where: { id },
			data: { ...dto, passwordHash },
		})
	}
	delete(id: number): Promise<Client> {
		return this.prisma.client.delete({
			where: { id },
		})
	}
}
