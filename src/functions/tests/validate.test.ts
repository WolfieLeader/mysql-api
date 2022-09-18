import { expect, it, describe } from "@jest/globals";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateId,
  validateHobbies,
  validateToken,
  validateDecoded,
} from "../validate";
import jsonwebtoken from "jsonwebtoken";
import { secretKey } from "../../config/secretKey";
import { hashIt } from "../encrypt";

describe("Testing validate.ts Folder", () => {
  describe("Testing validateEmail Function", () => {
    it("Should return true if the email is valid", () => {
      const email = "test@gmail.com";
      expect(validateEmail(email)).toBe(true);
    });
    it("Should throw Missing Email", () => {
      const email = undefined;
      expect(() => validateEmail(email)).toThrow("Missing Email");
    });
    it("Should throw Invalid Email", () => {
      const email = 123;
      expect(() => validateEmail(email)).toThrow("Invalid Email Type");
    });
    it("Should throw Email too long", () => {
      const email = "A".repeat(256);
      expect(() => validateEmail(email)).toThrow("Email too long");
    });
    it("Should throw Invalid Email", () => {
      const email = "test@gmail..com";
      expect(() => validateEmail(email)).toThrow("Invalid Email");
    });
  });
  describe("Testing validateName Function", () => {
    it("Should return true if the name is valid", () => {
      const name = "Wolfie";
      expect(validateName(name)).toBe(true);
    });
    it("Should throw Missing Name", () => {
      const name = undefined;
      expect(() => validateName(name)).toThrow("Missing Name");
    });
    it("Should throw Invalid Name", () => {
      const name = 123;
      expect(() => validateName(name)).toThrow("Invalid Name Type");
    });
    it("Should throw Name must be between 4 and 20 characters", () => {
      const name = "A".repeat(21);
      expect(() => validateName(name)).toThrow("Name must be between 4 and 20 characters");
    });
    it("Should throw Invalid Name", () => {
      const name = "test@";
      expect(() => validateName(name)).toThrow("Invalid Name");
    });
  });
  describe("Testing validatePassword Function", () => {
    it("Should return true if the password is valid", () => {
      const password = "SecurePassword123";
      expect(validatePassword(password)).toBe(true);
    });
    it("Should throw Missing Password", () => {
      const password = undefined;
      expect(() => validatePassword(password)).toThrow("Missing Password");
    });
    it("Should throw Invalid Password", () => {
      const password = 123;
      expect(() => validatePassword(password)).toThrow("Invalid Password Type");
    });
    it("Should throw Password must be between 8 and 20 characters", () => {
      const password = "A".repeat(21);
      expect(() => validatePassword(password)).toThrow("Password must be between 8 and 20 characters");
    });
    it("Should throw Invalid Password", () => {
      const password = "שלוםShalom";
      expect(() => validatePassword(password)).toThrow("Invalid Password");
    });
  });
  describe("Testing validateId Function", () => {
    it("Should return true if id is valid", () => {
      const id = 4;
      expect(validateId(id)).toBe(true);
    });
    it("Should throw Missing Id", () => {
      const id = undefined;
      expect(() => validateId(id)).toThrow("Missing Id");
    });
    it("Should throw Invalid Id", () => {
      const id = "Test";
      expect(() => validateId(id)).toThrow("Invalid Id Type");
    });
    it("Should throw Invalid Id", () => {
      const id = -1;
      expect(() => validateId(id)).toThrow("Invalid Id");
    });
    it("Should throw Out Of Range", () => {
      const id = 2 ** 53;
      expect(() => validateId(id)).toThrow("Out Of Range");
    });
  });
  describe("Testing validateHobbies Function", () => {
    it("Should return true if hobbies is valid", () => {
      const hobbies = ["Hobby1", "Hobby2", "Hobby3"];
      expect(validateHobbies(hobbies)).toBe(true);
    });
    it("Should throw Missing Hobbies", () => {
      const hobbies = undefined;
      expect(() => validateHobbies(hobbies)).toThrow("Missing Hobbies");
    });
    it("Should throw Invalid Hobbies", () => {
      const hobbies = "Test";
      expect(() => validateHobbies(hobbies)).toThrow("Invalid Hobbies Type");
    });
    it("Should throw Missing Hobbies", () => {
      const hobbies: string[] = [];
      expect(() => validateHobbies(hobbies)).toThrow("Missing Hobbies");
    });
    it("Should throw Too Many Hobbies", () => {
      const hobbies = ["Hobby1", "Hobby2", "Hobby3", "Hobby4", "Hobby5", "Hobby6"];
      expect(() => validateHobbies(hobbies)).toThrow("Too Many Hobbies");
    });
    it("Should throw Missing Hobby", () => {
      const hobbies = [""];
      expect(() => validateHobbies(hobbies)).toThrow("Missing Hobby");
    });
    it("Should throw Invalid Hobby Type", () => {
      const hobbies = ["Hobby1", 123, "Hobby2"];
      expect(() => validateHobbies(hobbies)).toThrow("Invalid Hobby Type");
    });
    it("Should throw Hobby must be between 2 and 30 characters", () => {
      const hobbies = ["Hobby1", "A".repeat(31), "Hobby2"];
      expect(() => validateHobbies(hobbies)).toThrow("Hobby must be between 2 and 30 characters");
    });
    it("Should throw Invalid Hobby", () => {
      const hobbies = ["Hobby1", "Test@", "Hobby2"];
      expect(() => validateHobbies(hobbies)).toThrow("Invalid Hobby");
    });
  });
  describe("Testing validateToken Function", () => {
    it("Should return true if token is valid", () => {
      const jwtKey = hashIt(secretKey);
      const token = jsonwebtoken.sign({ id: 23 }, jwtKey, { expiresIn: "5m" });
      expect(validateToken(token)).toBe(true);
    });
    it("Should throw Missing Token", () => {
      const token = undefined;
      expect(() => validateToken(token)).toThrow("Missing Token");
    });
    it("Should throw Invalid Token Type", () => {
      const token = 123;
      expect(() => validateToken(token)).toThrow("Invalid Token Type");
    });
    it("Should throw jwt malformed", () => {
      const token = "Test";
      expect(() => validateToken(token)).toThrow("jwt malformed");
    });
    it("Should throw jwt expired", async () => {
      const jwtKey = hashIt(secretKey);
      const token = jsonwebtoken.sign({ id: 23 }, jwtKey, { expiresIn: "1s" });
      await new Promise((resolve) => setTimeout(resolve, 1100));
      expect(() => validateToken(token)).toThrow("jwt expired");
    });
    it("Should throw invalid signature", () => {
      const token = jsonwebtoken.sign({ id: 23 }, "Test", { expiresIn: "5m" });
      expect(() => validateToken(token)).toThrow("invalid signature");
    });
    it("Should throw invalid token", () => {
      const jwtKey = hashIt(secretKey);
      const token = jsonwebtoken.sign({ id: 23 }, jwtKey, { expiresIn: "5m" });
      expect(() => validateToken(token.slice(2, token.length))).toThrow("invalid token");
    });
  });
  describe("Testing validateDecoded Function", () => {
    it("Should return true if decoded is valid", () => {
      const jwtKey = hashIt(secretKey);
      const decoded = jsonwebtoken.decode(jsonwebtoken.sign({ id: 23 }, jwtKey, { expiresIn: "5m" }));
      expect(validateDecoded(decoded)).toBe(true);
    });
    it("Should throw Missing Token Content", () => {
      const decoded = undefined;
      expect(() => validateDecoded(decoded)).toThrow("Missing Token Content");
    });
    it("Should throw Invalid Token Content Type", () => {
      const decoded = 123;
      expect(() => validateDecoded(decoded)).toThrow("Invalid Token Content Type");
    });
    it("Should throw Missing Id", () => {
      const decoded = {};
      expect(() => validateDecoded(decoded)).toThrow("Missing Id");
    });
    it("Should throw Invalid Id Type", () => {
      const decoded = { id: "Test" };
      expect(() => validateDecoded(decoded)).toThrow("Invalid Id Type");
    });
    it("Should throw Invalid Id", () => {
      const decoded = { id: -1 };
      expect(() => validateDecoded(decoded)).toThrow("Invalid Id");
    });
    it("Should throw Out Of Range", () => {
      const decoded = { id: 2 ** 53 };
      expect(() => validateDecoded(decoded)).toThrow("Out Of Range");
    });
  });
});
