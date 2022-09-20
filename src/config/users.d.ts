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
  netWorth: number;
  hobbies: string[] | null;
  email: string;
  password: string;
  createdAt: any;
}
