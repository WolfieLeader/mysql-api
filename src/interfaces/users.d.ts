export interface INewUser {
  name: string;
  netWorth?: string;
  hobbies?: string[];
  email: string;
  password: string;
}

export interface IUser {
  readonly id: number;
  name: string;
  netWorth: number;
  hobbies: string[] | null;
  email: string;
  password: string;
  createdAt: Date;
}
