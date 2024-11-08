import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TrainingProgramsController } from './training-programs.controller'
import { TrainingProgramsService } from './training-programs.service'

@Module({
	controllers: [TrainingProgramsController],
	providers: [TrainingProgramsService, PrismaService],
})
export class TrainingProgramsModule {}
