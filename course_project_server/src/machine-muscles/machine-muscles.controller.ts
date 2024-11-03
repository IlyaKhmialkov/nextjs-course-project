import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateMachineMuscleDto } from './dto/create-machine-muscle.dto'
import { MachineMusclesService } from './machine-muscles.service'

@Controller('machine-muscles')
export class MachineMusclesController {
	constructor(private readonly machineMusclesService: MachineMusclesService) {}

	@Get()
	getAllRecords() {
		return this.machineMusclesService.getAllRecords()
	}

	@Get('machines/:id')
	getAllExerciseMachines(@Param('id') id: number) {
		return this.machineMusclesService.getAllExerciseMachines(id)
	}

	@Get('muscles/:id')
	getAllMuscleGroups(@Param('id') id: number) {
		return this.machineMusclesService.getAllMuscleGroups(id)
	}

	@Post('create')
	create(@Body() dto: CreateMachineMuscleDto) {
		return this.machineMusclesService.create(dto)
	}

	@Delete()
	delete(@Body() dto: CreateMachineMuscleDto) {
		return this.machineMusclesService.delete(dto)
	}
}
