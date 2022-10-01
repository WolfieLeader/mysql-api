import CError from "../../error/CError";
import { getUserIdByName } from "../../functions/query";
interface INewCompany {
  name: string;
  foundersNames: string[];
  year: number;
}

export const defaultCompanies: INewCompany[] = [
  {
    name: "Meta",
    foundersNames: ["Mark Zuckerberg", "Eduardo Saverin"],
    year: 2004,
  },
  {
    name: "Microsoft",
    foundersNames: ["Bill Gates"],
    year: 1975,
  },
  {
    name: "SpaceX",
    foundersNames: ["Elon Musk"],
    year: 2002,
  },
  {
    name: "Tesla",
    foundersNames: ["Elon Musk"],
    year: 2003,
  },
  {
    name: "Amazon",
    foundersNames: ["Jeff Bezos"],
    year: 1994,
  },
  {
    name: "Google",
    foundersNames: ["Larry Page", "Sergey Brin"],
    year: 1998,
  },
  {
    name: "Apple",
    foundersNames: ["Steve Jobs", "Steve Wozniak"],
    year: 1976,
  },
];

export const unformattedCompanies = (async (): Promise<string[]> => {
  return await Promise.all(
    defaultCompanies.map(async (company) => {
      const names = company.foundersNames;
      if (Array.isArray(names) && names.length < 1) throw new CError("No founders names");
      const founder1Id = await getUserIdByName(Array.isArray(names) ? names[0] : names);
      const founder2Id = Array.isArray(names) && names.length > 1 ? await getUserIdByName(names[1]) : null;
      if (founder1Id === -1 || (Array.isArray(names) && names.length > 1 && founder2Id === -1))
        throw new CError("Founder not found", 404);
      return `('${company.name}', ${founder1Id},${founder2Id}, ${company.year})`;
    })
  );
})();
