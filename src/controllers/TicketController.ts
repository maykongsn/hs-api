import { Request, response, Response } from 'express';
import { TicketService } from './../services/TicketService';

export class TicketController {
    async handleCreate(request: Request, response: Response) {
        const { title, client_id, priority, message, status } = request.body;

        const service = new TicketService();
        const result = await service.store({ title, client_id, priority, message, status });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async handleGetInProgress(request: Request, response: Response) {
        const service = new TicketService();
        const result = await service.listAllInProgress();

        return response.json(result);
    }

    async handleGetOpen(request: Request, response: Response) {
        const service = new TicketService();
        const result = await service.listAllOpen();

        return response.json(result);
    }

    async handleGetClosed(request: Request, response: Response) {
        const service = new TicketService();
        const result = await service.listAllClosed();

        return response.json(result);
    }

    async handleGetByCode(request: Request, response: Response) {
        const code = request.params.code;
        const service = new TicketService();
        const result = await service.listByCode(code);

        if(!result.length) {
            return response.status(204).json();
        }

        return response.json(result);
    }

    async handleGetByClientId(request: Request, response: Response) {
        const client_id = request.params.clientId;
        const service = new TicketService();
        const result = await service.listClientTickets(client_id);

        if(!result.length) {
            return response.status(204).json();
        }

        return response.json(result);
    }

    async handleCloseTicket(request: Request, response: Response) {
        const code = request.params.code;
        const service = new TicketService();
        const result = await service.updateTicketToClosed(code);

        if(!result) {
            return response.status(204).json();
        }

        return response.json(result);
    }

    async handlePutTicketInProgress(request: Request, response: Response) {
        const code = request.params.code;
        const service = new TicketService();
        const result = await service.updateTicketToInProgress(code);

        if(!result) {
            return response.status(204).json();
        }

        return response.json(result);
    }
}
