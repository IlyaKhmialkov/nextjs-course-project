import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { MuscleGroupsService } from './muscle-groups.service'

@Controller('muscle-groups')
export class MuscleGroupsController {
	constructor(private readonly muscleGroupsService: MuscleGroupsService) {}

	@Get()
	getAllMuscleGroups() {
		return this.muscleGroupsService.getAllMuscleGroups()
	}

	@Get(':id')
	getMuscleGroupById(@Param('id') id: string) {
		const machineId = parseInt(id)
		return this.muscleGroupsService.getMuscleGroup(machineId)
	}

	@Get('name/:name')
	getMuscleGroupsByName(@Param('name') name: string) {
		return this.muscleGroupsService.getMuscleGroupsByName(name)
	}

	@Get('machines/:name')
	getExersiseMachinesIdsByNameOfMuscleGroup(@Param('name') name: string) {
		return this.muscleGroupsService.getExersiseMachinesIdsByNameOfMuscleGroup(name)
	}
	@Post('create')
	createMuscleGroup(@Body('name') name: string) {
		return this.muscleGroupsService.createMuscleGroup(name)
	}

	@Put(':id')
	updateMuscleGroup(@Param('id') id: string, @Body('name') name: string) {
		const machineId = parseInt(id)
		return this.muscleGroupsService.updateMuscleGroup(machineId, name)
	}

	@Delete(':id')
	deleteMuscleGroup(@Param('id') id: string) {
		const machineId = parseInt(id)
		return this.muscleGroupsService.deleteMuscleGroup(machineId)
	}
}
