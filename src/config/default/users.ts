interface INewUser {
  name: string;
  networth?: string;
  hobbies?: string[];
  email: string;
  password: string;
}

export const defaultUsers: INewUser[] = [
  {
    name: "Steve Jobs",
    email: "steve@apple.com",
    password: "SimpleAndClean",
  },
  {
    name: "Mark Zuckerberg",
    networth: "57.7B",
    hobbies: ["Programming", "Collecting data", "Algorithms", "AI", "Metaverse"],
    email: "mark@meta.com",
    password: "EvilCorp",
  },
  {
    name: "Bill Gates",
    networth: "107.4B",
    hobbies: ["Programming", "Reading", "Investing"],
    email: "bill@outlook.com",
    password: "ImJustRich",
  },
  {
    name: "Eduardo Saverin",
    hobbies: ["Finance", "Being Loyal", "Algorithms"],
    email: "edurado@facebook.com",
    password: "LifeIsntFair",
  },

  {
    name: "Elon Musk",
    networth: "259.8B",
    hobbies: ["Programming", "Lunching Rockets", "Tweeting", "AI"],
    email: "elon@tesla.com",
    password: "MarsIsEarth2.0",
  },
  {
    name: "Jeff Bezos",
    networth: "152.9B",
    hobbies: ["Business", "Lunching Rockets", "Engineering"],
    email: "jeff@amazon.com",
    password: "IOwnTheWorld",
  },
  {
    name: "Larry Page",
    networth: "90.6B",
    hobbies: ["Programming", "Reading", "Googling", "AI"],
    email: "larry@gmail.com",
    password: "JustGoogleIt",
  },
  {
    name: "Sergey Brin",
    email: "sergey@gmail.com",
    password: "GoogolIsBetter",
  },
  {
    name: "Steve Wozniak",
    email: "2ndsteve@apple.com",
    password: "ItsNotFunBeing2nd",
  },
];
