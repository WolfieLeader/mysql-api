export interface IUser {
  readonly id: number;
  name: string;
  networth: number;
  hobbies: string[] | null;
  email: string;
  password: string;
  createdAt: Date;
}

export interface ICompany {
  readonly id: number;
  name: string;
  founder1: number;
  founder2: number | null;
  year: number;
}
