export async function up(knex) {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary();

    table.string("name", 50).unique().notNullable();

    table.timestamps(true, true);
  });

  await knex.schema.createTable("permissions", (table) => {
    table.increments("id").primary();

    table.string("name", 100).unique().notNullable();

    table.string("resource", 50).notNullable();

    table.string("action", 50).notNullable();

    table.timestamps(true, true);
  });

  await knex.schema.createTable("user_roles", (table) => {
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("role_id")
      .notNullable()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE");

    table.primary(["user_id", "role_id"]);
  });

  await knex.schema.createTable("role_permissions", (table) => {
    table
      .integer("role_id")
      .notNullable()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE");

    table
      .integer("permission_id")
      .notNullable()
      .references("id")
      .inTable("permissions")
      .onDelete("CASCADE");

    table.primary(["role_id", "permission_id"]);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("role_permissions");
  await knex.schema.dropTableIfExists("user_roles");
  await knex.schema.dropTableIfExists("permissions");
  await knex.schema.dropTableIfExists("roles");
}
