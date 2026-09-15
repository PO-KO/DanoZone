import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserAddressDto {
  @IsBoolean()
  @ApiProperty()
  isDefault: boolean;
}
