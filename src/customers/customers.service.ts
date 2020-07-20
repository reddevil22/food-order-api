import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/model';
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

    public async create(todo: CustomerDto): Promise<Customers> {
        return await this.customerRepository.save(todo);
    }

    public async update(
        id: number,
        newValue: CustomerDto,
    ): Promise<Customers | null> {
        const todo = await this.customerRepository.findOneOrFail(id);
        if (!todo.id) {
            // tslint:disable-next-line:no-console
            console.error("Todo doesn't exist");
        }
        await this.customerRepository.update(id, newValue);
        return await this.customerRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.customerRepository.delete(id);
    }
}
