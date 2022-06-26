import dataSource from '../database/ormconfig';
import { Client } from '../entities/Client';
import bcrypt from 'bcrypt';

type ClientRequest = {
    name: string;
    password: string;
    email: string;
}

export class CreateClientService {
    async store({name, password, email}: ClientRequest): Promise<Client | Error> {
        const repository = dataSource.getRepository(Client);

        if(await repository.findOne({where: {email} })) {
            return new Error('Client already exists');
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const client = repository.create({
            name,
            password: hashPassword,
            email,
        });

        await repository.save(client);
        return client;
    }
}
