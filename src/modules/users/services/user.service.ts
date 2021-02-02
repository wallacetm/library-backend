import { UserDTO } from '../dtos/user.dto';

const usersInExternal = [
  new UserDTO({
    username: 'admin',
    _password: 'adminadmin'
  }),
  new UserDTO({
    username: 'user',
    _password: 'useruser'
  })
]

export class UserService {
  public static findOne(username: string): Promise<UserDTO> {
    return Promise.resolve(usersInExternal.find(user => user.username === username));
  }
}