import { Router } from 'express';
import { CreateClientController } from './controllers/CreateClientController';
import { CreateTicketController } from './controllers/CreateTicketController';
import { GetAllClientTicketsController } from './controllers/GetAllClientTicketsController';
import { AuthController } from './controllers/AuthController';

const routes = Router();

routes.post('/client/new', new CreateClientController().handle);
routes.get('/tickets/new', new CreateClientController().handle);
routes.post('/auth', new AuthController().auth);
routes.get('/client/tickets', new GetAllClientTicketsController().handle);

export { routes };
