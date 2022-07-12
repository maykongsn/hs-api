import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Ticket } from './Ticket';

@Entity("messages")
export class Message {
    @PrimaryColumn()
    id: string;

    @Column()
    ticket_code: string;

    @ManyToOne(() => Ticket)
    @JoinColumn({ name: "ticket_code" })
    ticket: Ticket;

    @Column()
    author: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
