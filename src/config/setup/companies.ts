import { getUserIdByName } from "../../functions/query";
import { ICompany } from "../../interfaces/companies";

export const defaultCompanies: ICompany[] = [
  {
    name: "Meta",
    founder: "Mark Zuckerberg",
    foundedAt: 2004,
  },
  {
    name: "Microsoft",
    founder: "Bill Gates",
    foundedAt: 1975,
  },
  {
    name: "SpaceX",
    founder: "Elon Musk",
    foundedAt: 2002,
  },
  {
    name: "Tesla",
    founder: "Elon Musk",
    foundedAt: 2003,
  },
  {
    name: "Amazon",
    founder: "Jeff Bezos",
    foundedAt: 1994,
  },
  {
    name: "Bill & Melinda Gates Foundation",
    founder: "Bill Gates",
    foundedAt: 2000,
  },
  {
    name: "Google",
    founder: "Larry Page",
    foundedAt: 1998,
  },
];

export const unformattedCompanies = (async (): Promise<string[]> => {
  return await Promise.all(
    defaultCompanies.map(
      async (company) => `('${company.name}', ${await getUserIdByName(company.founder)}, ${company.foundedAt})`
    )
  );
})();
