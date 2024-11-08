import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class CreateClientDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	passwordHash: string

	@IsString()
	@IsNotEmpty()
	name: string

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	age: number

	@IsString()
	@IsNotEmpty()
	gender: string
}
