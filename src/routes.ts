import { Router } from 'express';
import { CreateClientController } from './controllers/CreateClientController';
import { GetAllClientTicketsController } from './controllers/GetAllClientTicketsController';

import { AuthController } from './controllers/AuthController';
import { AuthMiddleware } from './middlewares/auth';

const routes = Router();

routes.post('/client/new', new CreateClientController().handle);
routes.post('/auth', new AuthController().auth);
routes.get('/client/tickets', AuthMiddleware, new GetAllClientTicketsController().handle);

export { routes };
