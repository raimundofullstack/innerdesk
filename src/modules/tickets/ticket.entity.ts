import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../users/user.entity";

export type TicketStatus =
  | "open"
  | "in_progress"
  | "pending"
  | "resolved"
  | "closed";

export type TicketPriority = "low" | "normal" | "high" | "critical";

@Entity("tickets")
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column({
    type: process.env.NODE_ENV === "test" ? "text" : "enum",
    enum: ["open", "in_progress", "pending", "resolved", "closed"],
    default: "open",
  })
  status!: TicketStatus;

  @Column({
    type: process.env.NODE_ENV === "test" ? "text" : "enum",
    enum: ["low", "normal", "high", "critical"],
    default: "normal",
  })
  priority!: TicketPriority;

  @ManyToOne(() => User)
  created_by!: User;

  @ManyToOne(() => User, { nullable: true })
  assigned_to!: User | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
