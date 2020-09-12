import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
require('dotenv').config();

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			autoLoadEntities: true,
			migrationsTableName: 'migration',
			cli: {
				migrationsDir: 'src/migration',
				entitiesDir: "src/entity",
			},
			synchronize: false
		}),
		CustomersModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
