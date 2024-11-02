import { Module } from '@nestjs/common'
import { ExersiseMachinesModule } from './exersise-machines/exersise-machines.module'
import { MachineMusclesModule } from './machine-muscles/machine-muscles.module'
import { MuscleGroupsModule } from './muscle-groups/muscle-groups.module'

@Module({
	imports: [ExersiseMachinesModule, MuscleGroupsModule, MachineMusclesModule],
})
export class AppModule {}
