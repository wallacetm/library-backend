import { MigrationInterface, QueryRunner } from 'typeorm';
import * as logger from 'winston';

export default class Seeds1612210247031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queryBuilder = queryRunner.connection.createQueryBuilder();
    await queryBuilder.insert()
      .into('books')
      .values([
        {
          uuid: 'cb1a088a-b684-43f0-87ba-55766d3db636',
          name: 'Nome do livro - 0',
          author: 'Nome do autor - 0',
          description: 'Breve descrição do livro - 0',
          publishedDate: new Date(),
          updatedDate: new Date(),
          updatedBy: 'SISTEMA',
          createdDate: new Date(),
          createdBy: 'SISTEMA'
        },
        {
          uuid: 'e36b53d7-909f-4194-8a75-957f6d611e84',
          name: 'Nome do livro - 1',
          author: 'Nome do autor - 1',
          description: 'Breve descrição do livro - 1',
          publishedDate: new Date(),
          updatedDate: new Date(),
          updatedBy: 'SISTEMA',
          createdDate: new Date(),
          createdBy: 'SISTEMA'
        },
        {
          uuid: 'e293ba29-b3c2-4e60-b08d-f6b1b61a6fc7',
          name: 'Nome do livro - 2',
          author: 'Nome do autor - 2',
          description: 'Breve descrição do livro - 2',
          publishedDate: new Date(),
          updatedDate: new Date(),
          updatedBy: 'SISTEMA',
          createdDate: new Date(),
          createdBy: 'SISTEMA'
        },
        {
          uuid: '7e24796a-c105-447d-aba8-a8ed5e84fb2f',
          name: 'Nome do livro - 3',
          author: 'Nome do autor - 3',
          description: 'Breve descrição do livro - 3',
          publishedDate: new Date(),
          updatedDate: new Date(),
          updatedBy: 'SISTEMA',
          createdDate: new Date(),
          createdBy: 'SISTEMA'
        },
        {
          uuid: 'b17bb9d8-f16c-4a42-a267-e6dd1a804088',
          name: 'Nome do livro - 4',
          author: 'Nome do autor - 4',
          description: 'Breve descrição do livro - 4',
          publishedDate: new Date(),
          updatedDate: new Date(),
          updatedBy: 'SISTEMA',
          createdDate: new Date(),
          createdBy: 'SISTEMA'
        },
        {
          uuid: '20a75d9d-db14-4c34-bba3-39096b7e96d1',
          name: 'Nome do livro - 5',
          author: 'Nome do autor - 5',
          description: 'Breve descrição do livro - 5',
          publishedDate: new Date(),
          updatedDate: new Date(),
          updatedBy: 'SISTEMA',
          createdDate: new Date(),
          createdBy: 'SISTEMA'
        },
      ]).execute();
  }
  public async down(): Promise<void> {
    logger.info('-');
  }
}