import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @IsNumber()
    @ApiProperty()
    readonly id: number;

    @IsNotEmpty()
    @ApiProperty()
    readonly firstname: string;

    @ApiProperty()
    readonly surname: string;

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly created_on: Date;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    readonly password: string;
}

export default RegisterDto;