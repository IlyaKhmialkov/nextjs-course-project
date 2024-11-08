import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateProgramMuscleDto } from './dto/create-program-muscle.dto'
import { ProgramMusclesService } from './program-muscles.service'

@Controller('program-muscles')
export class ProgramMusclesController {
	constructor(private readonly programMusclesService: ProgramMusclesService) {}

	@Get()
	getAllRecords() {
		return this.programMusclesService.getAllRecords()
	}

	@Get('programs/:id')
	getAllTrainingPrograms(@Param('id') id: number) {
		return this.programMusclesService.getAllTrainingPrograms(id)
	}

	@Get('muscles/:id')
	getAllMuscleGroups(@Param('id') id: number) {
		return this.programMusclesService.getAllMuscleGroups(id)
	}

	@Post('create')
	create(@Body() dto: CreateProgramMuscleDto) {
		return this.programMusclesService.create(dto)
	}

	@Delete()
	delete(@Body() dto: CreateProgramMuscleDto) {
		return this.programMusclesService.delete(dto)
	}
}
