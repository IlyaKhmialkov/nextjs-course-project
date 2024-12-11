import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateAttendanceDto {
	@IsDateString()
	@IsNotEmpty()
	date: string

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	clientId: number
}
