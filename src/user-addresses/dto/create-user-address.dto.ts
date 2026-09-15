import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class CreateUserAddressDto {
  @IsUUID()
  @ApiProperty({ example: 'Enter user UUID' })
  userId: string;

  @IsBoolean()
  isDefault?: boolean;
}
