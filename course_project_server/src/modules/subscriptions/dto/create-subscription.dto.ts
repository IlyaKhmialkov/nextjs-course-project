import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from 'class-validator'

export class CreateSubscriptionDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	duration: number

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	price: number
}
