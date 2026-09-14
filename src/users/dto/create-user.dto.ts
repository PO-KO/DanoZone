import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'min length 8 chars' })
  password: string;
}
