export interface IUserRequired {
  name: string;
  email: string;
  password: string;
  networth?: number;
  hobbies?: string[];
}

export interface IUser extends IUserRequired {
  networth: number;
  hobbies: string[];
}
export interface IUserSchema extends IUser {
  readonly id: string;
}

export interface IUserSQL extends IUserSchema {
  readonly createdAt: Date;
}

export interface IUserModel extends IUserSchema {
  stringIt: () => string;
}
