import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateSubscriptionClientDto } from './dto/create-subscription-client.dto'
import { SubscriptionClientsService } from './subscription-clients.service'

@Controller('subscription-clients')
export class SubscriptionClientsController {
	constructor(private readonly subscriptionClientsService: SubscriptionClientsService) {}

	@Get()
	getAllRecords() {
		return this.subscriptionClientsService.getAllRecords()
	}

	@Get('clients/:id')
	getAllClients(@Param('id') id: number) {
		return this.subscriptionClientsService.getAllClients(id)
	}

	@Get('subscriptions/:id')
	getAllSubscriptions(@Param('id') id: number) {
		return this.subscriptionClientsService.getAllSubscriptions(id)
	}

	@Post('create')
	create(@Body() dto: CreateSubscriptionClientDto) {
		return this.subscriptionClientsService.create(dto)
	}

	@Delete()
	delete(@Body() dto: CreateSubscriptionClientDto) {
		return this.subscriptionClientsService.delete(dto)
	}
}
