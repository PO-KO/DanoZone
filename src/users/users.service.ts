import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { UserEmailAlreadyExistException } from '../common/exceptions/user-email-already-exist.exception.js';
import { UserNotFoundException } from '../common/exceptions/user-not-found.exception.js';
import { PaginatedResult } from '../common/dto/paginated-result.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);

    return this.userRepo.save(user);
  }

  // In Future You Can Add Filters
  async findAll(): Promise<PaginatedResult<User>> {
    const [items, totalItems] = await this.userRepo.findAndCount();

    return new PaginatedResult(items, {
      page: 1,
      limit: 10,
      totalItems,
      totalPages: 10,
    });
  }

  async findOne(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async update(user: User) {
    return this.userRepo.save(user);
  }

  async remove(id: string) {
    return this.userRepo.delete(id);
  }

  // #########################################################################

  async createOrFail(dto: CreateUserDto) {
    const existingEmail = await this.findOneByEmail(dto.email);

    if (existingEmail) throw new UserEmailAlreadyExistException();

    const user = await this.create(dto);

    return user;
  }

  async findOneOrFail(id: string) {
    const user = await this.findOne(id);

    if (!user) throw new UserNotFoundException(id);

    return user;
  }

  async updateOrFail(id: string, dto: UpdateUserDto) {
    const user = await this.findOneOrFail(id);

    if (dto.firstName) user.firstName = dto.firstName;

    if (dto.lastName) user.lastName = dto.lastName;

    if (dto.email) {
      const existingEmail = await this.findOneByEmail(dto.email);

      if (existingEmail) throw new UserEmailAlreadyExistException();

      user.email = dto.email;
    }

    if (dto.password) user.password = dto.password;

    const updatedUser = await this.update(user);

    return updatedUser;
  }

  async removeOrFail(id: string) {
    const { affected } = await this.remove(id);

    if (affected === 0) throw new UserNotFoundException(id);

    return id;
  }
}
