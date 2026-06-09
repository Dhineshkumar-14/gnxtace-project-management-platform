export async function up(knex) {
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();

    table
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE");

    table
      .integer("assignee_id")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.string("title", 300).notNullable();

    table.text("description").nullable();

    table
      .enu("status", [
        "todo",
        "in_progress",
        "in_review",
        "done",
        "cancelled",
      ])
      .defaultTo("todo");

    table
      .enu("priority", [
        "low",
        "medium",
        "high",
        "critical",
      ])
      .defaultTo("medium");

    table.date("due_date").nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("tasks");
}