// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { serial, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { unique } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dev-stage_${name}`);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  priority: text("priority").default("medium"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
  status: text("status").default("todo"),
  assignedTo: text("assigned_to"),
  tags: text("tags").array(),
  projectId: text("project_id"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  githubRepoLink: text("github_repo_link"),
  ownerId: text("owner_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("active"), //can be active -> completed -> archived (the archived one will have another section in the site where user can view his archived project whereas the completed projects all the home page will only show the active repo )
  targetCompletionDate: timestamp("target_completion_date")
})

export const projectMembers = pgTable("project_members", {
  id: serial("id").primaryKey(),
  projectId: text("project_id").references(() => projects.id).notNull(),
  userId: text("user_id").references(() => user.id).notNull(),
  role: text("role").default("member"), //currently only three types of member role are there admin, (by default to the one who initialised and cannot be changed), then there is reviewer and then there is member future version will have the option to add custom roles to the project
  joinedAt: timestamp("joined_at").defaultNow(),
});


