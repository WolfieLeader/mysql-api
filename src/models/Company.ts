import CError from "../error/CError";
import { validateCompanyName, validateYear } from "../functions/validate";
import { v4 as uuidv4 } from "uuid";
import { ICompany, ICompanyRow, ICompanyObj } from "./company.d";

class Company implements ICompanyObj {
  readonly id: string;
  name: string;
  founders: string[];
  year: number | null;

  constructor(company: ICompany) {
    validateCompanyName(company.name);
    if (company.year) validateYear(company.year);
    if (company.founders.length < 1) throw new CError("Company must have at least one founder");

    this.id = uuidv4();
    this.name = company.name.toLowerCase().trim();
    this.founders = company.founders;
    this.year = company.year ? company.year : null;
  }

  stringIt(): string {
    return `('${this.id}', 
            '${this.name}', 
            '${JSON.stringify(this.founders)}', 
            ${this.year})`;
  }
}

export default Company;
