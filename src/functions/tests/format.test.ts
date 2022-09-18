import { expect, it, describe } from "@jest/globals";
import { formatParamsToNumbers } from "../format";

describe("Testing format.ts Folder", () => {
  describe("Testing formatParamsToNumbers Function", () => {
    it("Should return an array of numbers", () => {
      const params = "1,2,3";
      expect(formatParamsToNumbers(params)).toEqual([1, 2, 3]);
    });
    it("Should throw Missing Params", () => {
      const params = undefined;
      expect(() => formatParamsToNumbers(params)).toThrow("Missing Params");
    });
    it("Should throw Invalid Params Type", () => {
      const params = { number: 1 };
      expect(() => formatParamsToNumbers(params)).toThrow("Invalid Params Type");
    });
    it("Should return the number in an array", () => {
      const params = 1;
      expect(formatParamsToNumbers(params)).toEqual([1]);
    });
    it("Should throw Out Of Range", () => {
      const params = 2 ** 53;
      expect(() => formatParamsToNumbers(params)).toThrow("Out Of Range");
    });
    it("Should throw Number Must Be Positive", () => {
      const params = -1;
      expect(() => formatParamsToNumbers(params)).toThrow("Number Must Be Positive");
    });
    it("Should return the number in an array", () => {
      const params = "1";
      expect(formatParamsToNumbers(params)).toEqual([1]);
    });
    it("Should throw Out Of Range", () => {
      const params = 2 ** 53;
      expect(() => formatParamsToNumbers(params.toString())).toThrow("Out Of Range");
    });
    it("Should throw Number Must Be Positive", () => {
      const params = "-1";
      expect(() => formatParamsToNumbers(params)).toThrow("Number Must Be Positive");
    });
    it("Should throw Invalid Params Content", () => {
      const params = "1d3cf";
      expect(() => formatParamsToNumbers(params)).toThrow("Invalid Params Content");
    });
    it("Should throw Invalid Params", () => {
      const params = "a,b,c";
      expect(() => formatParamsToNumbers(params)).toThrow("Invalid Params");
    });
    it("Should return an array of numbers", () => {
      const params = "1,b,3";
      expect(formatParamsToNumbers(params)).toEqual([1, 3]);
    });
  });
});
