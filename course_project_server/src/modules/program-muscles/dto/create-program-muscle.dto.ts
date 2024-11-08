import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
export class CreateProgramMuscleDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	trainingProgramId: number

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	muscleGroupId: number
}
