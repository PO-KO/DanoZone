import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service.js';
import { CountriesController } from './countries.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
