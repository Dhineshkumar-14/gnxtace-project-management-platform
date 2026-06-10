export async function up(knex) {
  await knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();

    table
      .integer("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("name", 200).notNullable();

    table.text("description").nullable();

    table
      .enu("status", [
        "active",
        "on_hold",
        "completed",
        "archived",
      ])
      .defaultTo("active");

    table.date("start_date").nullable();

    table.date("due_date").nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("projects");
}