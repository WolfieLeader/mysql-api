import { expect, it, describe, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../config/app";
import pool from "../config/sql/pool";

describe("Testing Users Route", () => {
  //Opens the server before every test
  let server: any;
  beforeAll(async () => {
    server = await app.listen(3000);
  });
  //Closes the server and the pool after every test
  afterAll(async () => {
    await server.close();
    await pool.end();
  });
  //The tests
  it("Should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
