import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Client } from './Client';

@Entity("tickets")
export class Ticket {
    @PrimaryColumn()
    code: string;

    @Column()
    title: string;

    @Column()
    client_id: string;

    @ManyToOne(() => Client, client => client.tickets)
    @JoinColumn({ name: "client_id" })
    client: Client;

    @Column()
    priority: string;

    @Column()
    message: string;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.code) {
            this.code = uuid();
        }
    }
}
