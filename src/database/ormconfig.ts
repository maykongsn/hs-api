import 'reflect-metadata';
import { DataSource } from 'typeorm';

import env from 'dotenv';

env.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    migrations: [__dirname + '/migrations/*.ts'],
});

dataSource.initialize()
    .then(() => console.log("Data Source has been initialized"))
    .catch((error) => console.error("Error initializing Data Source", error));

export default dataSource;
