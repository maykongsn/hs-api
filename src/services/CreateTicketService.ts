import dataSource from '../database/ormconfig';
import { Ticket } from '../entities/Ticket';

type TicketRequest = {
    title: string;
    client_id: string;
    priority: string;
    message: string;
    status: string;
}

export class CreateTicketService {
    async store({title, client_id, priority, message, status}: TicketRequest): Promise<Ticket | Error> {
        const repository = dataSource.getRepository(Ticket);

        const ticket = repository.create({
            title,
            client_id,
            priority,
            message,
            status
        });

        await repository.save(ticket);
        return ticket;
    }
}
