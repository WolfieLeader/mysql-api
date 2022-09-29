export interface ICompany {
  name: string;
  founder: string | string[];
  foundedAt: number;
}

export interface ICompanySQL {
  id: number;
  name: string;
  founderId: number;
  foundedAt: number;
}
