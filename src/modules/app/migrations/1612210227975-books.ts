import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Books1612210227975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'name',
            type: 'TEXT'
          },
          {
            name: 'description',
            type: 'TEXT'
          },
          {
            name: 'author',
            type: 'TEXT'
          },
          {
            name: 'publishedDate',
            type: 'INTEGER'
          },
          {
            name: 'createdDate',
            type: 'INTEGER'
          },
          {
            name: 'createdBy',
            type: 'TEXT'
          },
          {
            name: 'updatedDate',
            type: 'INTEGER'
          },
          {
            name: 'updatedBy',
            type: 'TEXT'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}