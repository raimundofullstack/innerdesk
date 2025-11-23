import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../src/modules/users/user.entity";
import { Ticket } from "../src/modules/tickets/ticket.entity";

export const testDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  synchronize: true,
  entities: [User, Ticket],
  logging: false,
});
