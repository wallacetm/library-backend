import { UserDTO } from '../modules/users/dtos/user.dto';

declare module 'express' {
  export interface Request {
    user: UserDTO
  }
}