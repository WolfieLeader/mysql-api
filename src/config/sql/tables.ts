export const createUsersTable = `CREATE TABLE users(
    id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    networth BIGINT DEFAULT 0,
    hobbies JSON,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id));`;

export const createCompaniesTable = `CREATE TABLE companies(
    id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    founders JSON NOT NULL,
    year INT,
    PRIMARY KEY(id));`;
