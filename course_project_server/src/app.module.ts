import { Module } from '@nestjs/common'
import { ExersiseMachinesModule } from './exersise-machines/exersise-machines.module'

@Module({
	imports: [ExersiseMachinesModule],
})
export class AppModule {}
