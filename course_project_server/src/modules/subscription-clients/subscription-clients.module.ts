import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SubscriptionClientsController } from './subscription-clients.controller'
import { SubscriptionClientsService } from './subscription-clients.service'

@Module({
	controllers: [SubscriptionClientsController],
	providers: [SubscriptionClientsService, PrismaService],
})
export class SubscriptionClientsModule {}
