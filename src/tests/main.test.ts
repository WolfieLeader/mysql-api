import { expect, it, describe } from "@jest/globals";
import supertest from "supertest";
import app from "../config/app";

const request = supertest(app);

describe("GET /", () => {
  it("should return 200", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
