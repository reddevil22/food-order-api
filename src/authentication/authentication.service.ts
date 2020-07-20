import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CustomersService } from 'src/customers/customers.service';
import RegisterDto from './dto/register.dto';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import { Customers } from 'src/model';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly customerService: CustomersService
    ) { }

    public async register(registrationData: RegisterDto): Promise<Customers> {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);

        try {
            const createdUser = await this.customerService.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<Customers> {
        try {
            const user = await this.customerService.findByEmail(email)
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
        }
    }
}
