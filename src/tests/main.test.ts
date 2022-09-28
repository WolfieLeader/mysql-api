import { expect, it, describe, beforeAll, afterAll } from "@jest/globals";
import supertest from "supertest";
import app from "../config/app";
import pool from "../config/sql/pool";

const request = supertest(app);

describe("GET /", () => {
  /**Opens the server before all the tests */
  let server: any;
  beforeAll(async () => {
    server = await app.listen(3000);
  });
  /**Closes the server and the pool after all the tests */
  afterAll(async () => {
    await server.close();
    await pool.end();
  });
  /**The tests*/
  it("Should return status code of 200", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toBe(200);
  });
});
