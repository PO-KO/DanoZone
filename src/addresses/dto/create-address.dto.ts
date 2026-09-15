import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  unitNumber?: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  streetNumber?: string;
  @IsString()
  @ApiProperty()
  addressLine1: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  addressLine2?: string;
  @IsString()
  @ApiProperty()
  city: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  region?: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 20 })
  postalCode?: string;
}
