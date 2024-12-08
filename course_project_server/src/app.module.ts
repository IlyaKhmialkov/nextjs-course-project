import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { JWTMiddleware } from './middleware/jwt-middleware'
import { AttendancesModule } from './modules/attendances/attendances.module'
import { AuthModule } from './modules/auth/auth.module'
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
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, '..', '..', 'static'),
		}),
		ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
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
		AuthModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JWTMiddleware).forRoutes('*')
	}
}
