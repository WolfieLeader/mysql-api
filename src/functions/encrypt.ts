import { scryptSync, randomBytes, timingSafeEqual, createHash } from "crypto";

/**The salt is a random string of bytes that is used to make the password harder to guess. */
export const saltIt = (data: string): string => {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(data, salt, 16, { N: 1024 }).toString("hex");
  return salt + ":" + key;
};

/**Compare the salt and the key to make sure the password is correct(and makes it time safe)*/
export const compareSalt = (salted: string, data: string): boolean => {
  if (!salted) {
    throw new Error("Missing encrypted data");
  }
  if (typeof salted !== "string" || typeof data !== "string") {
    throw new Error("Invalid data types");
  }
  if (salted.includes(":") === false) {
    throw new Error("Invalid encrypted data");
  }
  const [salt, key] = salted.split(":");
  const keyBuffered = Buffer.from(key, "hex");

  const dataBuffered = scryptSync(data, salt, 16, { N: 1024 });
  return timingSafeEqual(dataBuffered, keyBuffered);
};

/** Hash a string using SHA256 */
export function hashIt(data: string): string {
  if (!data) {
    throw new Error("Missing data");
  }
  if (typeof data !== "string") {
    throw new Error("Invalid data type");
  }
  return createHash("sha256").update(data).digest("hex");
}
