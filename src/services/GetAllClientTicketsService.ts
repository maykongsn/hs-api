import dataSource from '../database/ormconfig';
import { Ticket } from '../entities/Ticket';

export class GetAllClientTicketsService {
    async list(client_id: string) {
        const repository = dataSource.getRepository(Ticket);
        const tickets = await repository.find({ where: { client_id }});

        return tickets;
    }
}
