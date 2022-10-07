export interface ICompany {
  name: string;
  founders: string[];
  year: number | null;
}

export interface ICompanyRow extends ICompany {
  readonly id: string;
}

export interface ICompanyObj extends ICompanyRow {
  stringIt: () => string;
}
