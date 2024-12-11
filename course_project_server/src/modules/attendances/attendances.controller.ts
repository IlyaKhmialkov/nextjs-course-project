import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'src/guard/admin-guard'
import { AuthGuard } from 'src/guard/auth-guard'
import { AttendancesService } from './attendances.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'

@Controller('attendances')
export class AttendancesController {
	constructor(private readonly attendancesService: AttendancesService) {}

	@UseGuards(AuthGuard, AdminGuard)
	@Get()
	getAll() {
		return this.attendancesService.getAll()
	}
	@UseGuards(AuthGuard)
	@Get(':id')
	async getById(@Param('id') id: number) {
		const attendance = await this.attendancesService.get(id)
		if (!attendance) {
			throw new NotFoundException(`attendance whith ${id} doesn't exist`)
		} else {
			return attendance
		}
	}

	@UseGuards(AuthGuard)
	@Get('client/:id')
	async getByClientId(@Param('id') clientId: number) {
		const attendances = await this.attendancesService.getByClientId(clientId)
		if (!attendances.length) {
			throw new NotFoundException(`attendances whith clientId: ${clientId} doesn't exist`)
		} else {
			return attendances
		}
	}

	@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() dto: CreateAttendanceDto) {
		return this.attendancesService.create(dto)
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateAttendanceDto) {
		return this.attendancesService.update(id, dto)
	}

	@UseGuards(AuthGuard)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.attendancesService.delete(id)
	}
}
