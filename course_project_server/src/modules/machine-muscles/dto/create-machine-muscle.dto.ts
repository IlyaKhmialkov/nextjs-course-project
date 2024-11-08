import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateMachineMuscleDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	muscleGroupId: number

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	exerciseMachineId: number
}
