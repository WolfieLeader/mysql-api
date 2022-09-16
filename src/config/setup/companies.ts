import { getUserIdByName } from "../../functions/query";

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

export const defaultCompanies: Company[] = [
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
const formatCompanies = async (): Promise<string[]> => {
  const formattedCompanies = await Promise.all(
    defaultCompanies.map(async (company) => {
      const founderId = await getUserIdByName(company.founder);
      return `('${company.name}', ${founderId}, ${company.foundedAt})`;
    })
  );
  return formattedCompanies;
};

export const unformattedCompanies = formatCompanies();
