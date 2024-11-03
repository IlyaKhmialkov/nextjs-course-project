import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { CreateExerciseMachineDto } from './dto/create-exercise-machines.dto'
import { UpdateExerciseMachineDto } from './dto/update-exercise-machines.dto'
import { ExerciseMachinesService } from './exercise-machines.service'

@Controller('exercise-machines')
export class ExerciseMachinesController {
	constructor(private readonly exerciseMachinesService: ExerciseMachinesService) {}

	@Get()
	getAll() {
		return this.exerciseMachinesService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		const exerciseMachine = await this.exerciseMachinesService.get(id)
		if (!exerciseMachine) {
			throw new NotFoundException(`exercise machine whith ${id} doesn't exist`)
		} else {
			return exerciseMachine
		}
	}

	@Get('name/:name')
	getExerciseMachinesByName(@Param('name') name: string) {
		return this.exerciseMachinesService.getByName(name)
	}

	@Post('create')
	create(@Body() dto: CreateExerciseMachineDto) {
		return this.exerciseMachinesService.create(dto)
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() dto: UpdateExerciseMachineDto) {
		return this.exerciseMachinesService.update(id, dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.exerciseMachinesService.delete(id)
	}
}
