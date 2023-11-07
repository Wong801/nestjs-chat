import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-user.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
