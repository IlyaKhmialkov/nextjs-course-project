import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MuscleGroupsController } from './muscle-groups.controller'
import { MuscleGroupsService } from './muscle-groups.service'

@Module({
	controllers: [MuscleGroupsController],
	providers: [MuscleGroupsService, PrismaService],
})
export class MuscleGroupsModule {}
