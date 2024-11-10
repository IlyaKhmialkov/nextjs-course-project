import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth-guard'
import { CreateProgramMuscleDto } from './dto/create-program-muscle.dto'
import { ProgramMusclesService } from './program-muscles.service'

@Controller('program-muscles')
export class ProgramMusclesController {
	constructor(private readonly programMusclesService: ProgramMusclesService) {}

	@UseGuards(AuthGuard)
	@Get()
	getAllRecords() {
		return this.programMusclesService.getAllRecords()
	}

	@UseGuards(AuthGuard)
	@Get('programs/:id')
	getAllTrainingPrograms(@Param('id') id: number) {
		return this.programMusclesService.getAllTrainingPrograms(id)
	}

	@UseGuards(AuthGuard)
	@Get('muscles/:id')
	getAllMuscleGroups(@Param('id') id: number) {
		return this.programMusclesService.getAllMuscleGroups(id)
	}

	@UseGuards(AuthGuard)
	@Post('create')
	create(@Body() dto: CreateProgramMuscleDto) {
		return this.programMusclesService.create(dto)
	}

	@UseGuards(AuthGuard)
	@Delete()
	delete(@Body() dto: CreateProgramMuscleDto) {
		return this.programMusclesService.delete(dto)
	}
}
