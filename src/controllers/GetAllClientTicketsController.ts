import { Request, Response } from 'express';
import { GetAllClientTicketsService } from './../services/GetAllClientTicketsService';

export class GetAllClientTicketsController {
    async handle(request: Request, response: Response) {
        const client_id = request.client.clientId;

        const service = new GetAllClientTicketsService();
        const result = await service.list(client_id);

        if(!result.length) {
            return response.status(204).json();
        }

        return response.json(result);
    }
}
