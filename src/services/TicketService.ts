import dataSource from '../database/ormconfig';
import { Ticket } from '../entities/Ticket';

type TicketRequest = {
    title: string;
    client_id: string;
    priority: string;
    message: string;
    status: string;
}

export class TicketService {
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

    async listAllInProgress() {
        const repository = dataSource.getRepository(Ticket);
        const tickets = await repository.find({ where: { status: 'Em andamento' }});

        return tickets;
    }

    async listAllOpen() {
        const repository = dataSource.getRepository(Ticket);
        const tickets = await repository.find({ where: { status: 'Aberto' }});

        return tickets;
    }

    async listAllClosed() {
        const repository = dataSource.getRepository(Ticket);
        const tickets = await repository.find({ where: { status: 'Fechado' }});

        return tickets;
    }

    async listByCode(code: string) {
        const repository = dataSource.getRepository(Ticket);
        const tickets = await repository.find({ where: { code }, relations: ["client"]});

        return tickets;
    }

    async listClientTickets(client_id: string) {
        const repository = dataSource.getRepository(Ticket);
        const tickets = await repository.find({ where: { client_id }});

        return tickets;
    }

    async updateTicketToClosed(code: string) {
        const repository = dataSource.getRepository(Ticket);
        const ticket = await repository.findOne({ where: { code }});
        await repository.update({ code }, { status: 'Fechado' });

        return ticket;
    }

    async updateTicketToInProgress(code: string) {
        const repository = dataSource.getRepository(Ticket);
        const ticket = await repository.findOne({ where: { code }});
        await repository.update({ code }, { status: 'Em andamento' });

        return ticket;
    }
}
