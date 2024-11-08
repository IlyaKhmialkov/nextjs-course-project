import { IsMilitaryTime, IsNotEmpty, IsNumber, IsPositive, IsString, Max } from 'class-validator'
export class CreateTrainingProgramDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@Max(7)
	dayOfWeek: number

	@IsMilitaryTime()
	@IsNotEmpty()
	time: string

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	clientId: number
}
