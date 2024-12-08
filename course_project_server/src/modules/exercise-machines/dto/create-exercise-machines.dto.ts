import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from 'class-validator'

export class CreateExerciseMachineDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	amount: number

	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	description: string
}
