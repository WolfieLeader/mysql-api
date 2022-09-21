export interface Company {
  name: string;
  founder: string | string[];
  foundedAt: number;
}

export interface CompanySQL {
  id: number;
  name: string;
  founderId: number;
  foundedAt: number;
}
