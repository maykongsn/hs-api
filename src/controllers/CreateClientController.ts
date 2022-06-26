import { Request, Response } from 'express';
import { CreateClientService } from './../services/CreateClientService';

export class CreateClientController {
    async handle(request: Request, response: Response) {
        const { name, password, email } = request.body;

        const service = new CreateClientService();
        const result = await service.store({ name, password, email });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
