import { PartialType } from '@nestjs/mapped-types';
import { CreateXrayDTO } from './create-Xray.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateXrayDTO {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  deviceId: string;

  @IsNumber()
  @ApiProperty()
  time: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  dataLength: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  dataVolume: number;
}
