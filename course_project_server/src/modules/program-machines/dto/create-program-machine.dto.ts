import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
export class CreateProgramMachineDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	trainingProgramId: number

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	exerciseMachineId: number
}
