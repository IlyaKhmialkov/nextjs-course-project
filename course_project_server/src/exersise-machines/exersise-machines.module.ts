import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ExersiseMachinesController } from './exersise-machines.controller'
import { ExersiseMachinesService } from './exersise-machines.service'

@Module({
	controllers: [ExersiseMachinesController],
	providers: [ExersiseMachinesService, PrismaService],
})
export class ExersiseMachinesModule {}
