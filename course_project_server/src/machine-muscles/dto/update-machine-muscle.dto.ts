import { PartialType } from '@nestjs/mapped-types'
import { CreateMachineMuscleDto } from './create-machine-muscle.dto'

export class UpdateMachineMuscleDto extends PartialType(CreateMachineMuscleDto) {}
