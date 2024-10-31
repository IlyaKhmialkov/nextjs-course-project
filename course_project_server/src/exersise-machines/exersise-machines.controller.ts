import { Controller, Get } from '@nestjs/common'
import { ExersiseMachinesService } from './exersise-machines.service'

@Controller('exersise-machines')
export class ExersiseMachinesController {
	constructor(private readonly exersiseMachinesService: ExersiseMachinesService) {}

	@Get('all')
	getAll() {
		return this.exersiseMachinesService.getAll()
	}
}
