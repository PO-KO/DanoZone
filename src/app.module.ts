import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPgConfig } from './config/db.config.js';
import { UsersModule } from './users/users.module.js';
import { AddressesModule } from './addresses/addresses.module.js';
import { CountriesModule } from './countries/countries.module.js';
import { UserAddressesModule } from './user-addresses/user-addresses.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getPgConfig(configService),
    }),
    UsersModule,
    AddressesModule,
    CountriesModule,
    UserAddressesModule,
  ],
})
export class AppModule {}
