import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto.js';
import { UpdateUserAddressDto } from './dto/update-user-address.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity.js';
import { Repository } from 'typeorm';
import { UserAddressAlreadyExistException } from '../common/exceptions/user-address-already-exist.exception.js';
import { UserAddressNotFoundException } from '../common/exceptions/user-address-not-found.exception.js';

@Injectable()
export class UserAddressesService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepo: Repository<UserAddress>,
  ) {}
  async create(dto: CreateUserAddressDto) {
    return this.userAddressRepo.create(dto);
  }

  async findByUser(userId: string) {
    return await this.userAddressRepo.find({
      where: { userId },
      relations: { address: true },
    });
  }

  async findOneByUserAndAddress(addressId: string) {
    return this.userAddressRepo.findOne({ where: { addressId } });
  }

  async updateIsDefault(userAddress: UserAddress) {
    return this.userAddressRepo.save(userAddress);
  }

  async remove(userId: string, addressId: string) {
    return this.userAddressRepo.delete({ userId, addressId });
  }

  // ####################################################################

  async createOrFail(dto: CreateUserAddressDto) {
    const existingAddress = await this.findOneByUserAndAddress(
      dto.userId,
      // addressId,
    );

    if (existingAddress) throw new UserAddressAlreadyExistException();

    const userAddress = await this.create(dto);

    return userAddress;
  }

  async removeOrFail(userId: string, addressId: string) {
    const { affected } = await this.remove(userId, addressId);

    if (affected === 0)
      throw new UserAddressNotFoundException(userId, addressId);
  }

  async findOneByUserAndAddressOrFail(userId: string, addressId: string) {
    const userAddress = await this.findOneByUserAndAddress(addressId);

    if (!userAddress) throw new UserAddressNotFoundException(userId, addressId);

    return userAddress;
  }

  async updateIsDefaultOrFail(
    userId: string,
    addressId: string,
    dto: UpdateUserAddressDto,
  ) {
    const userAddress = await this.findOneByUserAndAddressOrFail(
      userId,
      addressId,
    );
    if (dto.isDefault !== userAddress.isDefault) {
      if (dto.isDefault) {
        // Unset any existing default address for this user
        await this.userAddressRepo.update(
          { userId, isDefault: true },
          { isDefault: false },
        );
      }
      userAddress.isDefault = dto.isDefault;
      return await this.updateIsDefault(userAddress);
    }
    return userAddress;
  }
}
