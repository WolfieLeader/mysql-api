import { saltIt } from "../../functions/encrypt";
import { stringToBigNumber } from "../../functions/format";
import { User } from "../../interfaces/users";

export const defaultUsers: User[] = [
  {
    name: "Mark Zuckerberg",
    netWorth: "57.7B",
    hobbies: ["Programming", "Collecting data", "MetaVerse"],
    email: "mark@meta.com",
    password: "EvilCorp",
  },
  {
    name: "Bill Gates",
    netWorth: "107.4B",
    hobbies: ["Programming", "Reading", "Investing"],
    email: "bill@outlook.com",
    password: "ImJustRich",
  },
  {
    name: "Elon Musk",
    netWorth: "259.8B",
    hobbies: ["Programming", "Lunching Rockets", "Tweeting"],
    email: "elon@tesla.com",
    password: "Mars=Earth2.0",
  },
  {
    name: "Jeff Bezos",
    netWorth: "152.9B",
    hobbies: ["Business", "Lunching Rockets", "Engineering"],
    email: "jeff@amazon.com",
    password: "IOwnTheWorld",
  },
  {
    name: "Larry Page",
    netWorth: "90.6B",
    hobbies: ["Programming", "Reading", "Googling"],
    email: "larry@gmail.com",
    password: "JustGoogleIt",
  },
];

export const formattedUsers = defaultUsers.map(
  (user) =>
    `('${user.name}',
      ${user.netWorth ? stringToBigNumber(user.netWorth) : 0},
      ${user.hobbies ? `'${JSON.stringify(user.hobbies)}'` : null},
      '${user.email.toLowerCase()}',
      '${saltIt(user.password)}')`
);
