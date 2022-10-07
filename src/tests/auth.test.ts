import { expect, it, describe, afterAll, beforeAll } from "@jest/globals";
import request from "supertest";
import app from "../config/app";
import pool from "../config/sql/pool";

describe("Testing Users", () => {
  /**Opens the server before all the tests */
  let server: any;
  beforeAll(async () => {
    server = await app.listen(3000);
    await request(app).post("/reset");
  });
  /**Closes the server and the pool after all the tests */
  afterAll(async () => {
    await server.close();
    await pool.end();
  });
  /**The tests*/
  describe("Authentication", () => {
    describe("Sign Up", () => {
      it("Should create a new user", async () => {
        const res = await request(app).post("/auth/signup").send({
          name: "Tester",
          email: "test@testnet.com",
          password: "SecurePassword123",
        });
        expect(res.statusCode).toBe(201);
      });
      it("Shouldn't create a new user with the same email", async () => {
        const res = await request(app).post("/auth/signup").send({
          name: "Tester2",
          email: "test@testnet.com",
          password: "DogeToTheMoon",
        });
        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toBe("Email already taken");
      });
      it("Shouldn't create a new user with the same name", async () => {
        const res = await request(app).post("/auth/signup").send({
          name: "Tester",
          email: "legit@testnet.com",
          password: "ISwearImLegit",
        });
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toBe("Name already taken");
      });
    });
    describe("Login", () => {
      it("Should Login the user", async () => {
        const res = await request(app).post("/auth/login").send({
          email: "test@testnet.com",
          password: "SecurePassword123",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
      });
      it("Shouldn't login the user with the wrong password", async () => {
        const res = await request(app).post("/auth/login").send({
          email: "test@testnet.com",
          password: "SecurePassword1234",
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toBe("Wrong Password");
      });
      it("Shouldn't login the user with the wrong email", async () => {
        const res = await request(app).post("/auth/login").send({
          email: "tes@testnet.com",
          password: "SecurePassword123",
        });
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toBe("User not found");
      });
    });
  });
});
