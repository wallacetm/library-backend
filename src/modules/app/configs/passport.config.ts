import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { UserService } from '../../users/services/user.service';
import * as logger from 'winston';

passport.use(new BasicStrategy(
  async function (username, password, done) {
    try {
      const user = await UserService.findOne(username);
      if (!user) {
        return done(null, false);
      }
      if (!user.validatePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      logger.error('Error validating user auth', error);
      done(error);
    }
  }
));