import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ExersiseMachinesService } from './exersise-machines.service'

@Controller('exersise-machines')
export class ExersiseMachinesController {
	constructor(private readonly exersiseMachinesService: ExersiseMachinesService) {}

	@Get()
	getAllExersiseMachines() {
		return this.exersiseMachinesService.getAllExersiseMachines()
	}

	@Get(':id')
	getExersiseMachineById(@Param('id') id: string) {
		const machineId = parseInt(id)
		return this.exersiseMachinesService.getExersiseMachine(machineId)
	}

	@Get('name/:name')
	getExersiseMachinesByName(@Param('name') name: string) {
		return this.exersiseMachinesService.getExersiseMachinesByName(name)
	}

	@Post('create')
	createExersiseMachine(
		@Body('name') name: string,
		@Body('amount') amount: number,
		@Body('pictureLink') pictureLink: string,
		@Body('description') description: string
	) {
		return this.exersiseMachinesService.createExersiseMachine(name, amount, pictureLink, description)
	}

	@Put(':id')
	updateExersiseMachine(
		@Param('id') id: string,
		@Body('name') name: string,
		@Body('amount') amount: number,
		@Body('pictureLink') pictureLink: string,
		@Body('description') description: string
	) {
		const machineId = parseInt(id)
		return this.exersiseMachinesService.updateExersiseMachine(machineId, name, amount, pictureLink, description)
	}

	@Delete(':id')
	deleteExersiseMachine(@Param('id') id: string) {
		const machineId = parseInt(id)
		return this.exersiseMachinesService.deleteExersiseMachine(machineId)
	}
}
