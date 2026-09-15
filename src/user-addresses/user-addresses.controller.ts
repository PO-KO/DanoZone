import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service.js';
import { CreateUserAddressDto } from './dto/create-user-address.dto.js';
import { UpdateUserAddressDto } from './dto/update-user-address.dto.js';

@Controller('user/:userId/addresses')
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  @Post()
  create(@Body() dto: CreateUserAddressDto) {
    return this.userAddressesService.create(dto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.userAddressesService.findByUser(userId);
  }

  @Get(':addressId')
  findOne(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.userAddressesService.findOneByUserAndAddressOrFail(
      userId,
      addressId,
    );
  }

  @Patch(':addressId')
  update(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() dto: UpdateUserAddressDto,
  ) {
    return this.userAddressesService.updateIsDefaultOrFail(
      userId,
      addressId,
      dto,
    );
  }

  @Delete(':addressId')
  remove(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.userAddressesService.removeOrFail(userId, addressId);
  }
}
