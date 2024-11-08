import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramMuscleDto } from './create-program-muscle.dto';

export class UpdateProgramMuscleDto extends PartialType(CreateProgramMuscleDto) {}
