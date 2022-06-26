import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTickets1656254412564 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tickets',
                columns: [
                    {
                        name: 'code',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'client_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'priority',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fk_tickets_client',
                        columnNames: ['client_id'],
                        referencedTableName: 'clients',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tickets');
    }
}
