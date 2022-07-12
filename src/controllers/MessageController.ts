import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessageController {
    async handleCreate(request: Request, response: Response) {
        const { ticket_code, author, text } = request.body;

        const service = new MessageService();
        const result = await service.store({ ticket_code, author, text });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async handleGetByTicketId(request: Request, response: Response) {
        const ticket_code = request.params.code;
        const service = new MessageService();
        const result = await service.listTicketMessages(ticket_code)

        if(!result.length) {
            return response.status(204).json();
        }

        return response.json(result);
    }
}
