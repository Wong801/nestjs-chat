import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  GENDERS,
  HEIGHT_UNIT,
  HOROSCOPES,
  WEIGHT_UNIT,
  ZODIACS,
} from '../types/user.type';
import { Type } from 'class-transformer';
import { IsDateFormat } from '../validators/custom-date-format.validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({ type: String, required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}

export class UserLoginDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserHeightDto {
  @IsNumber()
  value: number;

  @IsEnum(HEIGHT_UNIT)
  unit: HEIGHT_UNIT;
}

export class UserWeightDto {
  @IsNumber()
  value: number;

  @IsEnum(WEIGHT_UNIT)
  unit: WEIGHT_UNIT;
}

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  displayName: string;

  @IsEnum(GENDERS)
  gender: GENDERS;

  @IsOptional()
  @IsString()
  about: string;

  @IsDateFormat({ message: 'Date must be in DD MM YYYY format' })
  doB: string;

  @IsOptional()
  @IsEnum(HOROSCOPES)
  horoscope: HOROSCOPES;

  @IsOptional()
  @IsEnum(ZODIACS)
  zodiac: ZODIACS;

  @IsOptional()
  @Type(() => UserHeightDto)
  height: UserHeightDto;

  @IsOptional()
  @Type(() => UserWeightDto)
  weight: UserWeightDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests: string[];
}
