import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'
import { MuscleGroupsService } from './muscle-groups.service'

@Controller('muscle-groups')
export class MuscleGroupsController {
	constructor(private readonly muscleGroupsService: MuscleGroupsService) {}

	@Get()
	getAll() {
		return this.muscleGroupsService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		const muscle = await this.muscleGroupsService.get(id)
		if (!muscle) {
			throw new NotFoundException(`muscle group whith id = ${id} doesn't exist`)
		} else {
			return muscle
		}
	}

	@Get('name/:name')
	getByName(@Param('name') name: string) {
		return this.muscleGroupsService.getByName(name)
	}

	@Get('machines/:name')
	getExerciseMachinesByNameOfMuscleGroup(@Param('name') name: string) {
		return this.muscleGroupsService.getExerciseMachinesByNameOfMuscleGroup(name)
	}
	@Post('create')
	create(@Body() dto: CreateMuscleGroupDto) {
		return this.muscleGroupsService.create(dto)
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() dto: UpdateMuscleGroupDto) {
		return this.muscleGroupsService.update(id, dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.muscleGroupsService.delete(id)
	}
}
