export interface User {
  name: string;
  netWorth?: string;
  hobbies?: string[];
  email: string;
  password: string;
}

export interface UserSQL {
  id: number;
  name: string;
  netWorth: number | null;
  hobbies: string[] | null;
  email: string;
  password: string;
  realPassword: string;
  createdAt: any;
}

export interface CError {
  errMessage: string;
  errStatus: number;
}
