#!/usr/bin/env node
import { config as loadDotEnv } from 'dotenv';
import app from './app';
import { createServer } from 'http';
import * as logger from 'winston';

loadDotEnv();

const DEFAULT_PORT = '3000';

async function bootstrap() {

  const port = normalizePort(process.env.PORT || DEFAULT_PORT);
  app.set('port', port);

  const server = createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function normalizePort(val) {
    const port = +val;
    if (isNaN(port)) {
      return DEFAULT_PORT;
    }
    if (port >= 0) {
      return port;
    }
    return DEFAULT_PORT;
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        logger.error(bind + ' requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
        logger.error(bind + ' is already in use');
        process.exit(1);
      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    logger.info('Listening on ' + bind);
  }
}

bootstrap();