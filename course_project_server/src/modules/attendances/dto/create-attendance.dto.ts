import { IsISO8601, IsMilitaryTime, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateAttendanceDto {
	@IsISO8601()
	@IsNotEmpty()
	date: string

	@IsMilitaryTime()
	@IsNotEmpty()
	spentTime: string

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	clientId: number
}
