import { Router } from 'express';
import { ClientController } from './controllers/ClientController';
import { TicketController } from './controllers/TicketController';
import { MessageController } from './controllers/MessageController';
import { AuthController } from './controllers/AuthController';

const routes = Router();

routes.post('/client/new', new ClientController().handleCreate);
routes.post('/tickets/new', new TicketController().handleCreate);
routes.get('/tickets-in-progress', new TicketController().handleGetInProgress);
routes.get('/tickets-open', new TicketController().handleGetOpen);
routes.get('/tickets-closed', new TicketController().handleGetClosed);
routes.get('/tickets/:code', new TicketController().handleGetByCode);
routes.put('/tickets/close/:code', new TicketController().handleCloseTicket);
routes.put('/tickets/in-progress/:code', new TicketController().handlePutTicketInProgress);
routes.get('/client/tickets/:clientId', new TicketController().handleGetByClientId);
routes.post('/message/send', new MessageController().handleCreate);
routes.get('/message/list/:code', new MessageController().handleGetByTicketId);
routes.post('/auth', new AuthController().auth);

export { routes };
