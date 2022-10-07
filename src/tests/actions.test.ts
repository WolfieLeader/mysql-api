import { expect, it, describe, afterAll, beforeAll } from "@jest/globals";
import request from "supertest";
import app from "../config/app";
import { defaultUsers } from "../config/default/users";
import pool from "../config/sql/pool";
import { bigNumberToString } from "../functions/format";

describe("Testing Users", () => {
  let server: any;
  let token: string;
  beforeAll(async () => {
    server = await app.listen(3000);
    await request(app).post("/reset");
    const res = await request(app).post("/auth/login").send({
      email: defaultUsers[0].email,
      password: defaultUsers[0].password,
    });
    token = res.body.token;
  });
  /**Closes the server and the pool after all the tests */
  afterAll(async () => {
    await server.close();
    await pool.end();
  });
  /**The tests*/
  describe("Actions", () => {
    describe("User actions", () => {
      it("Should change the users name", async () => {
        const newName = "Mark Elliot Zuckerberg";
        const res = await request(app).put("/actions/name").set("Authorization", `Bearer ${token}`).send({
          name: newName,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Name changed successfully");
        expect(res.body.name).toBe(newName);
      });
      it("Should change the users email", async () => {
        const newEmail = "mark@metaverse.com";
        const res = await request(app).put("/actions/email").set("Authorization", `Bearer ${token}`).send({
          email: newEmail,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Email changed successfully");
        expect(res.body.email).toBe(newEmail);
      });
      it("Should change the users password", async () => {
        const newPassword = "IllRuleTheMetaverse";
        const res = await request(app).put("/actions/password").set("Authorization", `Bearer ${token}`).send({
          last: defaultUsers[0].password,
          password: newPassword,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Password changed successfully");
      });
      it("Should change the user's networth", async () => {
        const newNetworth = "100B";
        const res = await request(app).put("/actions/networth").set("Authorization", `Bearer ${token}`).send({
          networth: newNetworth,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Networth changed successfully");
        expect(bigNumberToString(res.body.networth)).toBe(newNetworth);
      });
      it("Should change the user's hobbies", async () => {
        const newHobbies = ["Being Robotic", "Collecting data", "Not communicating with humans"];
        const res = await request(app).put("/actions/hobbies").set("Authorization", `Bearer ${token}`).send({
          hobbies: newHobbies,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Hobbies changed successfully");
        expect(res.body.hobbies).toEqual(newHobbies);
      });
    });

    describe("Company actions", () => {
      it("Should create a new company", async () => {
        const newCompanyName = "BlipBlop";
        const res = await request(app).post("/actions/company").set("Authorization", `Bearer ${token}`).send({
          name: newCompanyName,
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Company created successfully");
        expect(res.body.name).toBe(newCompanyName);
      });
      it("Should change the company's name", async () => {
        const newCompanyName = "Facebook2";
        const res = await request(app).put("/actions/company-name").set("Authorization", `Bearer ${token}`).send({
          last: "BlipBlop",
          name: newCompanyName,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Company name changed successfully");
        expect(res.body.name).toBe(newCompanyName);
      });
      it("Should change the company's year", async () => {
        const newYear = 2022;
        const res = await request(app).put("/actions/company-year").set("Authorization", `Bearer ${token}`).send({
          name: "Facebook2",
          year: newYear,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Company year changed successfully");
        expect(res.body.year).toBe(newYear);
      });
    });
  });
});
