import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { AttendancesService } from './attendances.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'

@Controller('attendances')
export class AttendancesController {
	constructor(private readonly attendancesService: AttendancesService) {}

	@Get()
	getAll() {
		return this.attendancesService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		const attendance = await this.attendancesService.get(id)
		if (!attendance) {
			throw new NotFoundException(`attendance whith ${id} doesn't exist`)
		} else {
			return attendance
		}
	}

	@Post('create')
	async create(@Body() dto: CreateAttendanceDto) {
		return this.attendancesService.create(dto)
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateAttendanceDto) {
		return this.attendancesService.update(id, dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.attendancesService.delete(id)
	}
}
