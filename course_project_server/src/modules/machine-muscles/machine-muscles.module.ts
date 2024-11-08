import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MachineMusclesController } from './machine-muscles.controller'
import { MachineMusclesService } from './machine-muscles.service'

@Module({
	controllers: [MachineMusclesController],
	providers: [MachineMusclesService, PrismaService],
})
export class MachineMusclesModule {}
