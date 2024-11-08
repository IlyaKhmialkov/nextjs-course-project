import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateProgramMachineDto } from './dto/create-program-machine.dto'
import { ProgramMachinesService } from './program-machines.service'

@Controller('program-machines')
export class ProgramMachinesController {
	constructor(private readonly programMachinesService: ProgramMachinesService) {}

	@Get()
	getAllRecords() {
		return this.programMachinesService.getAllRecords()
	}

	@Get('machines/:id')
	getAllExerciseMachines(@Param('id') id: number) {
		return this.programMachinesService.getAllExerciseMachines(id)
	}

	@Get('programs/:id')
	getAllTrainingPrograms(@Param('id') id: number) {
		return this.programMachinesService.getAllTrainingPrograms(id)
	}

	@Post('create')
	create(@Body() dto: CreateProgramMachineDto) {
		return this.programMachinesService.create(dto)
	}

	@Delete()
	delete(@Body() dto: CreateProgramMachineDto) {
		return this.programMachinesService.delete(dto)
	}
}
