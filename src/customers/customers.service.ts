import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/entity';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customers)
        private readonly customerRepository: Repository<Customers>,
    ) { }

    public async findAll(): Promise<Customers[]> {
        return await this.customerRepository.find();
    }

    public async findById(id: number): Promise<Customers | null> {
        return await this.customerRepository.findOneOrFail(id);
    }

    public async findByEmail(email: string): Promise<Customers | null> {
        return await this.customerRepository.findOneOrFail({ email });
    }

    public async create(customer: CustomerDto): Promise<Customers> {
        return await this.customerRepository.save(customer);
    }

    public async update(
        id: number,
        newValue: CustomerDto,
    ): Promise<Customers | null> {
        const customer = await this.customerRepository.findOneOrFail(id);
        if (!customer.id) {
            // tslint:disable-next-line:no-console
            console.error("customer doesn't exist");
        }
        await this.customerRepository.update(id, newValue);
        return await this.customerRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.customerRepository.delete(id);
    }
}
