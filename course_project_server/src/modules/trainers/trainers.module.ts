import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TrainersController } from './trainers.controller'
import { TrainersService } from './trainers.service'

@Module({
	controllers: [TrainersController],
	providers: [TrainersService, PrismaService],
})
export class TrainersModule {}
