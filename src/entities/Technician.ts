import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity("technicians")
export class Technician {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;
}
