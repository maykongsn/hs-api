import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { Client } from '../entities/Client';
import { Technician } from '../entities/Technician';
import dataSource from '../database/ormconfig';

export class AuthController {
    async auth(request: Request, response: Response) {
        const { email, password } = request.body;

        const clientRepository = dataSource.getRepository(Client);
        const technicianRepository = dataSource.getRepository(Technician);

        const client = await clientRepository.findOne({ where: { email }});
        const technician = await technicianRepository.findOne({ where: { email }});

        if(!client && !technician) {
            return response.status(404).json('Invalid email');
        } else if(client) {
            const isClientValidPassword = await compare(password, client.password);

            if(!isClientValidPassword) {
                return response.json({ error: "Password invalid!" });
            }

            const token = sign({ id: client.id }, process.env.SECRET, { expiresIn: "1hr"});
            return response.json({ client, token });
        } else {
            const isTechnicianValidPassword = await compare(password, technician.password);

            if(!isTechnicianValidPassword) {
                return response.json({ error: "Password invalid!"});
            }

            const token = sign({ id: technician.id }, process.env.SECRET, { expiresIn: "1hr"});
            return response.json({ technician, token });
        }
    }
}
