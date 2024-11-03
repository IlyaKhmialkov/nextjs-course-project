import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateMuscleGroupDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string
}
