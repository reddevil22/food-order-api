import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly firstname: string;

    @ApiProperty()
    readonly surname: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly created_on: Date;
}
