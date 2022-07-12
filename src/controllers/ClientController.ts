import { Request, Response } from 'express';
import { ClientService } from './../services/ClientService';

export class ClientController {
    async handleCreate(request: Request, response: Response) {
        const { name, password, email } = request.body;

        const service = new ClientService();
        const result = await service.store({ name, password, email });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
