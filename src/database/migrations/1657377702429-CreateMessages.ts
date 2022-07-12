import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateMessages1657377702429 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'messages',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'ticket_code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'author',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'text',
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
                        name: 'fk_messages_ticket',
                        columnNames: ['ticket_code'],
                        referencedTableName: 'tickets',
                        referencedColumnNames: ['code']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
