import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProgramMusclesController } from './program-muscles.controller'
import { ProgramMusclesService } from './program-muscles.service'

@Module({
	controllers: [ProgramMusclesController],
	providers: [ProgramMusclesService, PrismaService],
})
export class ProgramMusclesModule {}
