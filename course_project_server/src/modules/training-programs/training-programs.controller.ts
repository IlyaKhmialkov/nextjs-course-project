import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { CreateTrainingProgramDto } from './dto/create-training-program.dto'
import { UpdateTrainingProgramDto } from './dto/update-training-program.dto'
import { TrainingProgramsService } from './training-programs.service'

@Controller('training-programs')
export class TrainingProgramsController {
	constructor(private readonly trainingProgramsService: TrainingProgramsService) {}

	@Get()
	getAll() {
		return this.trainingProgramsService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		const program = await this.trainingProgramsService.get(id)
		if (!program) {
			throw new NotFoundException(`training program whith ${id} doesn't exist`)
		} else {
			return program
		}
	}

	@Post('create')
	async create(@Body() dto: CreateTrainingProgramDto) {
		return this.trainingProgramsService.create(dto)
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateTrainingProgramDto) {
		return this.trainingProgramsService.update(id, dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.trainingProgramsService.delete(id)
	}
}
