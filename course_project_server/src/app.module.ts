import { Module } from '@nestjs/common'
import { AttendancesModule } from './modules/attendances/attendances.module'
import { ClientsModule } from './modules/clients/clients.module'
import { ExerciseMachinesModule } from './modules/exercise-machines/exercise-machines.module'
import { MachineMusclesModule } from './modules/machine-muscles/machine-muscles.module'
import { MuscleGroupsModule } from './modules/muscle-groups/muscle-groups.module'
import { ProgramMachinesModule } from './modules/program-machines/program-machines.module'
import { ProgramMusclesModule } from './modules/program-muscles/program-muscles.module'
import { SubscriptionClientsModule } from './modules/subscription-clients/subscription-clients.module'
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module'
import { TrainersModule } from './modules/trainers/trainers.module'
import { TrainingProgramsModule } from './modules/training-programs/training-programs.module'

@Module({
	imports: [
		ExerciseMachinesModule,
		MuscleGroupsModule,
		MachineMusclesModule,
		SubscriptionsModule,
		TrainersModule,
		ClientsModule,
		SubscriptionClientsModule,
		AttendancesModule,
		TrainingProgramsModule,
		ProgramMachinesModule,
		ProgramMusclesModule,
	],
})
export class AppModule {}
