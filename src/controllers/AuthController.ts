import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { Client } from '../entities/Client';
import dataSource from '../database/ormconfig';

export class AuthController {
    async auth(request: Request, response: Response) {
        const { email, password } = request.body;

        const clientRepository = dataSource.getRepository(Client);
        const client = await clientRepository.findOne({ where: { email }});

        if(!client) {
            return new Error('Client not exists');
        }

        const isValidPassword = await compare(password, client.password);

        if(!isValidPassword) {
            return response.json({ error: "Password invalid!" });
        }

        const token = sign({ id: client.id }, process.env.SECRET, { expiresIn: "1hr"});

        return response.json({ client, token });
    }
}
