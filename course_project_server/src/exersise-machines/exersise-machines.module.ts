import { Module } from '@nestjs/common';
import { ExersiseMachinesService } from './exersise-machines.service';
import { ExersiseMachinesController } from './exersise-machines.controller';

@Module({
  controllers: [ExersiseMachinesController],
  providers: [ExersiseMachinesService],
})
export class ExersiseMachinesModule {}
