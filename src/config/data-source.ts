import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";
import { Ticket } from "../modules/tickets/ticket.entity";
import dotenv from "dotenv";
import { createDatabase } from "typeorm-extension";

const isTest = process.env.NODE_ENV === "test";
dotenv.config();
export const dataSource = new DataSource(
  isTest
    ? {
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        synchronize: true,
        logging: false,
        entities: [User, Ticket],
        migrations: ["src/migrations/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dropSchema: false,
        synchronize: false,
        logging: false,
        entities: [User, Ticket],
        migrations: ["src/migrations/*.ts"],
      }
);

export const initDatabase = async () => {
  await createDatabase({
    ifNotExist: true,
    options: dataSource.options,
  });

  await dataSource.initialize();
};
