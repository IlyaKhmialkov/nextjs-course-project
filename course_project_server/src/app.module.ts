import { Module } from '@nestjs/common'
import { ExerciseMachinesModule } from './exercise-machines/exercise-machines.module'
import { MachineMusclesModule } from './machine-muscles/machine-muscles.module'
import { MuscleGroupsModule } from './muscle-groups/muscle-groups.module'

@Module({
	imports: [ExerciseMachinesModule, MuscleGroupsModule, MachineMusclesModule],
})
export class AppModule {}
