import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramMachineDto } from './create-program-machine.dto';

export class UpdateProgramMachineDto extends PartialType(CreateProgramMachineDto) {}
