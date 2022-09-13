import { User } from "../interfaces";
import dotenv from "dotenv";

dotenv.config();

export const connectionSettings = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "usersDB",
};

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
];

export const secretKey = process.env.SECRET_KEY || "Secret";
