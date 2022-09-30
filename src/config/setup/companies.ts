import CError from "../../error/CError";
import { getUserIdByName } from "../../functions/query";
import { INewCompany } from "../../interfaces/companies";

export const defaultCompanies: INewCompany[] = [
  {
    name: "Meta",
    founders: ["Mark Zuckerberg", "Eduardo Saverin"],
    year: 2004,
  },
  {
    name: "Microsoft",
    founders: "Bill Gates",
    year: 1975,
  },
  {
    name: "SpaceX",
    founders: "Elon Musk",
    year: 2002,
  },
  {
    name: "Tesla",
    founders: "Elon Musk",
    year: 2003,
  },
  {
    name: "Amazon",
    founders: "Jeff Bezos",
    year: 1994,
  },
  {
    name: "Google",
    founders: ["Larry Page", "Sergey Brin"],
    year: 1998,
  },
  {
    name: "Apple",
    founders: ["Steve Jobs", "Steve Wozniak"],
    year: 1976,
  },
];

export const unformattedCompanies = (async (): Promise<string[]> => {
  return await Promise.all(
    defaultCompanies.map(async (company) => {
      const isFounders = Array.isArray(company.founders) && company.founders.length > 0;
      const founder1Id = await getUserIdByName(isFounders ? company.founders[0] : company.founders);
      const founder2Id = isFounders ? await getUserIdByName(company.founders[1]) : null;
      if (founder1Id === -1 || (isFounders && founder2Id === -1)) throw new CError("Founder not found", 404);
      const string = `('${company.name}', ${founder1Id},${founder2Id}, ${company.year})`;
      return string;
    })
  );
})();
