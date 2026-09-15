import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service.js';
import { UserAddressesController } from './user-addresses.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
})
export class UserAddressesModule {}
