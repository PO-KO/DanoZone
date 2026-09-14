import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPgConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbUrl = configService.get<string>('DB_URL');

  if (!dbUrl)
    throw new Error('DATABASE_URL is not defined in environment variables');

  return {
    type: 'postgres',
    url: dbUrl,
    autoLoadEntities: true,
    synchronize: true,
  };
};
