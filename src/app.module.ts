import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config';
import { CustomersModule } from './customers/customers.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
		CustomersModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
