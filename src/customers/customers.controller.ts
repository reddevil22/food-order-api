import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from 'src/entity';
import { CustomerDto } from './customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private service: CustomersService) { }

    @Get()
    public async getAll(): Promise<Customers[]> {
        return await this.service.findAll()
    }

    @Get(':id')
    public async getOne(@Param('id') id: number): Promise<Customers> {
        return await this.service.findById(id)
    }

    @Post()
    public async create(@Body() createCustomerDto: CustomerDto): Promise<Customers> {
        const newCustomer = await this.service.create({ ...createCustomerDto, created_on: new Date() });
        const returnObject = newCustomer;
        delete returnObject.password
        return returnObject;
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() createCustomerDto: CustomerDto): Promise<Customers | null> {
        const currentCustomer = await this.service.findById(id);
        const updatedCustomer = await this.service.update(id, {...currentCustomer, ...createCustomerDto});
        delete updatedCustomer.password;
        return updatedCustomer;
    }
}
