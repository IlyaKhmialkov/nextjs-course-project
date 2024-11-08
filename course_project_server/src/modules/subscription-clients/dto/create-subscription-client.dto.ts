import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateSubscriptionClientDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	clientId: number

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	subscriptionId: number

	@IsNumber()
	@IsNotEmpty()
	daysLeft: number
}
