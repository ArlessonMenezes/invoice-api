import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: configService.get('DB_TYPE'),
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  database: configService.get('DB_NAME'),
  password: configService.get('DB_PASSWORD'),
  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions);