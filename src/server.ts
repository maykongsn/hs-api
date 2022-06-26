import express from 'express';
import './database/ormconfig';

import { routes } from './routes';

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3001);
