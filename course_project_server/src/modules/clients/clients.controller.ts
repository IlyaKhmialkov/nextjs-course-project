import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth-guard'
import { TrainerGuard } from 'src/guard/trainer-guard'
import { GeneratePasswordHash } from 'src/utils/generatePasswordHash'
import { ClientsService } from './clients.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@Controller('clients')
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@UseGuards(AuthGuard, TrainerGuard)
	@Get()
	getAll() {
		return this.clientsService.getAll()
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	async getById(@Param('id') id: number) {
		const client = await this.clientsService.get(id)
		if (!client) {
			throw new NotFoundException(`client whith ${id} doesn't exist`)
		} else {
			return client
		}
	}

	@Post('create')
	async create(@Body('data') dto: CreateClientDto, @Body('password') password: string) {
		dto.passwordHash = await GeneratePasswordHash(password)
		return this.clientsService.create(dto)
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	async update(@Param('id') id: number, @Body('data') dto: UpdateClientDto, @Body('password') password?: string) {
		if (password) {
			const passwordHash = await GeneratePasswordHash(password)
			return this.clientsService.update(id, dto, passwordHash)
		}
		return this.clientsService.update(id, dto)
	}

	@UseGuards(AuthGuard)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.clientsService.delete(id)
	}
}
