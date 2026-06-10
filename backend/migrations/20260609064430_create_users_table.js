export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table.string("email", 255).unique().notNullable();

    table.string("password_hash", 255).notNullable();

    table.string("first_name", 100).notNullable();

    table.string("last_name", 100).notNullable();

    table.boolean("is_active").defaultTo(true);

    // Refresh token storage
    table.text("refresh_token").nullable();

    table.timestamp("refresh_token_expires_at").nullable();

    table.timestamp("last_login_at").nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
