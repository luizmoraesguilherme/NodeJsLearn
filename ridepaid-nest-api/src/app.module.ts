import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from './modules/driver/driver.module';
import { DriverSchema } from './schemas/driver.schema';
import { AppConfigModule } from './shared/app-config/app-config.module';
import { AppConfigService } from './shared/app-config/app-config.service';
import { CarModule } from './modules/car/car.module';
import { CarSchema } from './schemas/car.schema';
import { UserModule } from './modules/user/user.module';
import { UserSchema } from './schemas/user.schema';
import { HashingModule } from './shared/hashing/hashing.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT')),
        database: config.get('DB_NAME'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        entities: [
          DriverSchema,
          CarSchema,
          UserSchema
        ],
        // logging: true
      })
    }),
    DriverModule,
    CarModule,
    UserModule,
    HashingModule
  ]
})
export class AppModule { }
