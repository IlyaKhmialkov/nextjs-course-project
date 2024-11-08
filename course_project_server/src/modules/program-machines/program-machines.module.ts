import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProgramMachinesController } from './program-machines.controller'
import { ProgramMachinesService } from './program-machines.service'

@Module({
	controllers: [ProgramMachinesController],
	providers: [ProgramMachinesService, PrismaService],
})
export class ProgramMachinesModule {}
