export async function up(knex) {
  await knex.schema.createTable("audit_logs", (table) => {
    table.bigIncrements("id").primary();

    table
      .integer("user_id")
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.string("action", 100).notNullable();

    table.string("resource_type", 50).nullable();

    table.integer("resource_id").nullable();

    table.string("ip_address", 45).nullable();

    table.json("old_values").nullable();

    table.json("new_values").nullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("audit_logs");
}