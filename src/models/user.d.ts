export interface IUser {
  name: string;
  email: string;
  password: string;
  networth: number;
  hobbies: string[] | null;
}

export interface IUserRow extends IUser {
  readonly id: string;
  readonly createdAt: Date;
}

export interface IUserObj extends IUserRow {
  readonly createdAt: Date | null;
  stringIt: () => string;
}
