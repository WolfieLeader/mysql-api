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
