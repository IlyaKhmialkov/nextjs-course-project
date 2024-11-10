import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth-guard'
import { CreateProgramMachineDto } from './dto/create-program-machine.dto'
import { ProgramMachinesService } from './program-machines.service'

@Controller('program-machines')
export class ProgramMachinesController {
	constructor(private readonly programMachinesService: ProgramMachinesService) {}

	@UseGuards(AuthGuard)
	@Get()
	getAllRecords() {
		return this.programMachinesService.getAllRecords()
	}

	@UseGuards(AuthGuard)
	@Get('machines/:id')
	getAllExerciseMachines(@Param('id') id: number) {
		return this.programMachinesService.getAllExerciseMachines(id)
	}

	@UseGuards(AuthGuard)
	@Get('programs/:id')
	getAllTrainingPrograms(@Param('id') id: number) {
		return this.programMachinesService.getAllTrainingPrograms(id)
	}

	@UseGuards(AuthGuard)
	@Post('create')
	create(@Body() dto: CreateProgramMachineDto) {
		return this.programMachinesService.create(dto)
	}

	@UseGuards(AuthGuard)
	@Delete()
	delete(@Body() dto: CreateProgramMachineDto) {
		return this.programMachinesService.delete(dto)
	}
}
