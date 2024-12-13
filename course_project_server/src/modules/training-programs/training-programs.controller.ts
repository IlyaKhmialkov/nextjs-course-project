import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'src/guard/admin-guard'
import { AuthGuard } from 'src/guard/auth-guard'
import { CreateTrainingProgramDto } from './dto/create-training-program.dto'
import { UpdateTrainingProgramDto } from './dto/update-training-program.dto'
import { TrainingProgramsService } from './training-programs.service'

@Controller('training-programs')
export class TrainingProgramsController {
	constructor(private readonly trainingProgramsService: TrainingProgramsService) {}

	@UseGuards(AuthGuard, AdminGuard)
	@Get()
	getAll() {
		return this.trainingProgramsService.getAll()
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	async getById(@Param('id') id: number) {
		const program = await this.trainingProgramsService.get(id)
		if (!program) {
			throw new NotFoundException(`training program whith ${id} doesn't exist`)
		} else {
			return program
		}
	}

	@UseGuards(AuthGuard)
	@Get('client/:id')
	getByClientId(@Param('id') id: number) {
		return this.trainingProgramsService.getByClientId(id)
	}

	@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTrainingProgramDto) {
		return this.trainingProgramsService.create(dto)
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateTrainingProgramDto) {
		return this.trainingProgramsService.update(id, dto)
	}

	@UseGuards(AuthGuard)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.trainingProgramsService.delete(id)
	}
}
