import { Injectable } from '@nestjs/common'
import { Attendance } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'

@Injectable()
export class AttendancesService {
	constructor(private prisma: PrismaService) {}

	getAll(): Promise<Attendance[]> {
		return this.prisma.attendance.findMany()
	}
	get(id: number): Promise<Attendance | null> {
		return this.prisma.attendance.findUnique({
			where: { id },
		})
	}
	create(dto: CreateAttendanceDto): Promise<Attendance> {
		return this.prisma.attendance.create({
			data: dto,
		})
	}
	update(id: number, dto: UpdateAttendanceDto): Promise<Attendance> {
		return this.prisma.attendance.update({
			where: { id },
			data: dto,
		})
	}
	delete(id: number): Promise<Attendance> {
		return this.prisma.attendance.delete({
			where: { id },
		})
	}
}
