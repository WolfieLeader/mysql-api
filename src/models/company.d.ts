export interface ICompanyRequired {
  name: string;
  founders: string[];
  year?: number;
}

export interface ICompany extends ICompanyRequired {
  year: number | null;
}
export interface ICompanySchema extends ICompany {
  readonly id: string;
}

export interface ICompanySQL extends ICompanySchema {}

export interface ICompanyModel extends ICompanySchema {
  stringIt: () => string;
}
