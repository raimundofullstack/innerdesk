import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/users/user.entity";
import { Ticket } from "../modules/tickets/ticket.entity";
import dotenv from "dotenv";
import { createDatabase } from "typeorm-extension";

dotenv.config();
export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Ticket],
  migrations: ["src/migrations/*.ts"],
});

export const initDatabase = async () => {
  await createDatabase({
    ifNotExist: true,
    options: dataSource.options,
  });

  await dataSource.initialize();
};
