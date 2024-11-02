import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { MachineMusclesService } from './machine-muscles.service'

@Controller('machine-muscles')
export class MachineMusclesController {
	constructor(private readonly machineMusclesService: MachineMusclesService) {}

	@Get('')
	getAllRecords() {
		return this.machineMusclesService.getAllRecords()
	}

	@Get('machines/:id')
	getAllExersiseMachines(@Param('id') id: string) {
		const muscleGroupId = parseInt(id)
		return this.machineMusclesService.getAllExersiseMachines(muscleGroupId)
	}

	@Get('muscles/:id')
	getAllMuscleGroups(@Param('id') id: string) {
		const exersiseMachineId = parseInt(id)
		return this.machineMusclesService.getAllMuscleGroups(exersiseMachineId)
	}

	@Post('create')
	createMachineMuscle(
		@Body('muscleGroupId') muscleGroupId: number,
		@Body('exersiseMachineId') exersiseMachineId: number
	) {
		return this.machineMusclesService.createMachineMuscle(muscleGroupId, exersiseMachineId)
	}

	@Delete()
	deleteMachineMuscle(
		@Body('muscleGroupId') muscleGroupId: number,
		@Body('exersiseMachineId') exersiseMachineId: number
	) {
		return this.machineMusclesService.deleteMachineMuscle(muscleGroupId, exersiseMachineId)
	}
}
