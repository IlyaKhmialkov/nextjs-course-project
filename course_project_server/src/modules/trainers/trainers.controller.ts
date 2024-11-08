import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { GeneratePasswordHash } from 'src/utils/generatePasswordHash'
import { CreateTrainerDto } from './dto/create-trainer.dto'
import { UpdateTrainerDto } from './dto/update-trainer.dto'
import { TrainersService } from './trainers.service'

@Controller('trainers')
export class TrainersController {
	constructor(private readonly trainersService: TrainersService) {}

	@Get()
	getAll() {
		return this.trainersService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		const trainer = await this.trainersService.get(id)
		if (!trainer) {
			throw new NotFoundException(`trainer whith ${id} doesn't exist`)
		} else {
			return trainer
		}
	}

	@Post('create')
	async create(@Body('data') dto: CreateTrainerDto, @Body('password') password: string) {
		dto.passwordHash = await GeneratePasswordHash(password)
		return this.trainersService.create(dto)
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateTrainerDto, @Body('password') password?: string) {
		if (password) {
			const hash = await GeneratePasswordHash(password)
			return this.trainersService.update(id, dto, hash)
		}
		return this.trainersService.update(id, dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.trainersService.delete(id)
	}
}
