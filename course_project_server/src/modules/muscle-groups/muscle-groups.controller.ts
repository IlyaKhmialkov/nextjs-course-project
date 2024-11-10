import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'src/guard/admin-guard'
import { AuthGuard } from 'src/guard/auth-guard'
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
	@UseGuards(AuthGuard, AdminGuard)
	@Post('create')
	create(@Body() dto: CreateMuscleGroupDto) {
		return this.muscleGroupsService.create(dto)
	}

	@UseGuards(AuthGuard, AdminGuard)
	@Put(':id')
	update(@Param('id') id: number, @Body() dto: UpdateMuscleGroupDto) {
		return this.muscleGroupsService.update(id, dto)
	}

	@UseGuards(AuthGuard, AdminGuard)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.muscleGroupsService.delete(id)
	}
}
