import { expect, it, describe, afterAll, beforeAll } from "@jest/globals";
import request from "supertest";
import app from "../config/app";
import pool from "../config/sql/pool";

describe("Testing Users Route", () => {
  //Opens the server before all the tests
  let server: any;
  beforeAll(async () => {
    server = await app.listen(3000);
  });
  //Closes the server and the pool after all the tests
  afterAll(async () => {
    await server.close();
    await pool.end();
  });
  describe("GET /users", () => {
    it("Should reset the database", async () => {
      const response = await request(app).post("/reset");
      expect(response.status).toBe(200);
    });
    //The tests
    it("Should get all users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(5);
    });
    it("Should get a user by id", async () => {
      const res = await request(app).get("/users/1,3,5");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0].id).toBe(1);
      expect(res.body[1].id).toBe(3);
      expect(res.body[2].id).toBe(5);
    });
    it("Should get users by order, limit and offset", async () => {
      const res = await request(app).get("/users?order=desc&&limit=3&&offset=1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(3);
      expect(res.body[0].id).toBe(4);
    });
  });
  describe("Authentication", () => {
    it("Should register a new user", async () => {
      const res1 = await request(app).post("/auth/signup").send({
        name: "Test",
        email: "test@testnet.com",
        password: "SecurePassword123",
      });
      expect(res1.statusCode).toBe(201);
      const res2 = await request(app).get("/users?order=desc&&limit=1");
      expect(res2.statusCode).toBe(200);
      expect(res2.body).toBeInstanceOf(Array);
      expect(res2.body.length).toBe(1);
      expect(res2.body[0].name).toBe("Test");
    });
    it("Should login a user", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "test@testnet.com",
        password: "SecurePassword123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });
});
