import { Connection, createConnection } from 'typeorm'
import * as logger from 'winston';
import { Handler, NextFunction, Request, Response } from 'express';
import { databaseConfig } from '../configs/database.config';
import { databaseTestConfig } from '../configs/database-test.config';

export function connectionMiddleware(): Handler {
  let database;
  if (process.env['NODE_ENV'] === 'test') {
    database = databaseTestConfig;
  } else {
    database = databaseConfig;
  }
  const connectionPromise = createConnection(database).then(async (connection: Connection) => {
    if (!connection.isConnected) {
      return connection.connect();
    }
  });
  return async function setConnection(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await connectionPromise;
      next();
    } catch (error) {
      logger.error('Connection error', error);
      next(error);
    }
  }
}

