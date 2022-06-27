import { Request, Response } from 'express';
import { CreateTicketService } from './../services/CreateTicketService';

export class CreateTicketController {
    async handle(request: Request, response: Response) {
        const { title, client_id, priority, message, status } = request.body;

        const service = new CreateTicketService();
        const result = await service.store({ title, client_id, priority, message, status });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
