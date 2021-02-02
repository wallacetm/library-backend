import './modules/app/configs/passport.config';
import './modules/app/configs/logger.config';
import * as express from 'express';
import * as createError from 'http-errors';
import * as generator from 'express-swagger-generator';
import { name, description, version } from '../package.json';
import * as cors from 'cors'
import { bookRouter } from './modules/books/routers/book.router';
import { connectionMiddleware } from './modules/app/middlewares/connection.middleware';
import * as passport from 'passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(connectionMiddleware());
app.use(passport.initialize());

app.use('/', passport.authenticate('basic', { session: false }), bookRouter);

const expressSwagger = generator(app);
expressSwagger({
  swaggerDefinition: {
    info: {
      description: description,
      title: name,
      version: version,
    },
    produces: [
      'application/json',
    ],
    schemes: ['http']
  },
  basedir: __dirname,
  files: ['./**/*{.router,.dto}{.ts,.js}']
});


app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(err.status || 500).json({ message: err.message, details: err.details });
});

export default app;