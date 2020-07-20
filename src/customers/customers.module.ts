import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/model';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customers])],
    providers: [CustomersService],
    controllers: [CustomersController],
})
export class CustomersModule { }
