import { PartialType } from '@nestjs/mapped-types'
import { CreateExerciseMachineDto } from './create-exercise-machines.dto'

export class UpdateExerciseMachineDto extends PartialType(CreateExerciseMachineDto) {}
