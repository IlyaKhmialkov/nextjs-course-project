import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'src/guard/admin-guard'
import { AuthGuard } from 'src/guard/auth-guard'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'
import { SubscriptionsService } from './subscriptions.service'

@Controller('subscriptions')
export class SubscriptionsController {
	constructor(private readonly subscriptionsService: SubscriptionsService) {}

	@Get()
	getAll() {
		return this.subscriptionsService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		const subscription = await this.subscriptionsService.get(id)
		if (!subscription) {
			throw new NotFoundException(`subscription whith ${id} doesn't exist`)
		} else {
			return subscription
		}
	}

	@Get('name/:name')
	getByName(@Param('name') name: string) {
		return this.subscriptionsService.getByName(name)
	}

	@UseGuards(AuthGuard, AdminGuard)
	@Post('create')
	create(@Body() dto: CreateSubscriptionDto) {
		return this.subscriptionsService.create(dto)
	}

	@UseGuards(AuthGuard, AdminGuard)
	@Put(':id')
	update(@Param('id') id: number, @Body() dto: UpdateSubscriptionDto) {
		return this.subscriptionsService.update(id, dto)
	}

	@UseGuards(AuthGuard, AdminGuard)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.subscriptionsService.delete(id)
	}
}
