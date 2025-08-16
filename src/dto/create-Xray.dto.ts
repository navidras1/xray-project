import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateXrayDTO {
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
