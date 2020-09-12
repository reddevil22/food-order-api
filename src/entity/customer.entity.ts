import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    firstname: string;

    @Column({ type: 'varchar', length: 50 })
    surname: string;

    @Column({ type: 'varchar', length: 355, unique: true })
    email: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_on: Date;

    @Column({ type: 'varchar', length: 100 })
    address: string;

    @Column({ unique: true, nullable: true })
    public password: string;
}