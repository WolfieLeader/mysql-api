import CError from "../error/CError";
import { validateCompanyName, validateYear } from "../functions/validate";
import { v4 as uuidv4 } from "uuid";
import { ICompanyRequired, ICompanyModel } from "./company";

class Company implements ICompanyModel {
  readonly id: string;
  name: string;
  founders: string[];
  year: number | null;

  constructor(company: ICompanyRequired) {
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
