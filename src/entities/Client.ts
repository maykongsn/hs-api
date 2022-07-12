import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Ticket } from './Ticket';

@Entity("clients")
export class Client {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => Ticket, ticket => ticket.client)
    tickets: Ticket[];

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
