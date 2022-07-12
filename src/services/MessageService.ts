import dataSource from "../database/ormconfig";
import { Message } from "../entities/Message";

type MessageRequest = {
    ticket_code: string;
    author: string;
    text: string;
}

export class MessageService {
    async store({ ticket_code, author, text }: MessageRequest): Promise<Message | Error> {
        const repository = dataSource.getRepository(Message);

        const message = repository.create({
            ticket_code,
            author,
            text
        });

        await repository.save(message);
        return message;
    }

    async listTicketMessages(ticket_code: string) {
        const repository = dataSource.getRepository(Message);
        const messages = await repository.find({ where: { ticket_code }});

        return messages;
    }
}
