export interface INewCompany {
  name: string;
  founders: string | string[];
  year?: number; // year of founding
}

export interface ICompany {
  readonly id: number;
  name: string;
  founder1: number;
  founder2: number | null;
  year: number;
}
