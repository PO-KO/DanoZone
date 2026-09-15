import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto.js';
import { UpdateCountryDto } from './dto/update-country.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity.js';
import { Repository } from 'typeorm';
import { CountryNameAlreadyExist } from '../common/exceptions/country-name-already-exist.exception.js';
import { CountryNotFoundException } from '../common/exceptions/country-not-found.exception.js';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}
  async create(dto: CreateCountryDto) {
    return this.countryRepo.save(dto);
  }

  async findAll() {
    return await this.countryRepo.find();
  }

  async findOne(id: string) {
    return this.countryRepo.findOneBy({ id });
  }

  async findOneByName(name: string) {
    return this.countryRepo.findBy({ name });
  }

  update(id: number, dto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }

  // #######################################################

  async createOrFail(dto: CreateCountryDto) {
    const existingCountry = await this.findOneByName(dto.name);

    if (existingCountry) throw new CountryNameAlreadyExist();

    const country = await this.create(dto);

    return country;
  }

  async findOneOrFail(id: string) {
    const country = await this.findOne(id);

    if (!country) throw new CountryNotFoundException(id);

    return country;
  }
}
