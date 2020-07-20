import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    firstname: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    lastname: string;

    @Column({ type: 'varchar', length: 355, unique: true })
    email: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_on: Date;

    @Column()
    public password: string;
}