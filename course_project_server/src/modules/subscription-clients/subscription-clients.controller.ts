import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth-guard'
import { CreateSubscriptionClientDto } from './dto/create-subscription-client.dto'
import { SubscriptionClientsService } from './subscription-clients.service'

@Controller('subscription-clients')
export class SubscriptionClientsController {
	constructor(private readonly subscriptionClientsService: SubscriptionClientsService) {}

	@UseGuards(AuthGuard)
	@Get()
	getAllRecords() {
		return this.subscriptionClientsService.getAllRecords()
	}

	@UseGuards(AuthGuard)
	@Get('clients/:id')
	getAllClients(@Param('id') id: number) {
		return this.subscriptionClientsService.getAllClients(id)
	}

	@UseGuards(AuthGuard)
	@Get('subscriptions/:id')
	getAllSubscriptions(@Param('id') id: number) {
		return this.subscriptionClientsService.getAllSubscriptions(id)
	}

	@UseGuards(AuthGuard)
	@Post('create')
	create(@Body() dto: CreateSubscriptionClientDto) {
		return this.subscriptionClientsService.create(dto)
	}

	@UseGuards(AuthGuard)
	@Delete()
	delete(@Body() dto: CreateSubscriptionClientDto) {
		return this.subscriptionClientsService.delete(dto)
	}
}
