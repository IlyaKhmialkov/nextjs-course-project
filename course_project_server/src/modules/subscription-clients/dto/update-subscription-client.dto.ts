import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionClientDto } from './create-subscription-client.dto';

export class UpdateSubscriptionClientDto extends PartialType(CreateSubscriptionClientDto) {}
