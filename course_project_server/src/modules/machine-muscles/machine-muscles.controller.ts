import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'src/guard/admin-guard'
import { AuthGuard } from 'src/guard/auth-guard'
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

	@UseGuards(AuthGuard, AdminGuard)
	@Post('create')
	create(@Body() dto: CreateMachineMuscleDto) {
		return this.machineMusclesService.create(dto)
	}

	@UseGuards(AuthGuard, AdminGuard)
	@Delete()
	delete(@Body() dto: CreateMachineMuscleDto) {
		return this.machineMusclesService.delete(dto)
	}
}
