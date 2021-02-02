export class UserDTO {

  constructor(partial: Partial<UserDTO> = {}) {
    Object.assign(this, partial);
  }

  username: string;
  readonly _password: string;

  public validatePassword(password: string): boolean {
    return this._password === password;
  }

}