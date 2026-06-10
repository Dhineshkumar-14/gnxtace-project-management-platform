export const syncSequence = async (knex, table) => {
  await knex.raw(`
    SELECT setval(
      pg_get_serial_sequence('${table}', 'id'),
      COALESCE((SELECT MAX(id) FROM ${table}), 1)
    );
  `);
};

export const syncAllSequences = async (knex) => {
  const tables = [
    "users",
    "roles",
    "permissions",
    "projects",
    "tasks",
    "audit_logs",
  ];

  for (const table of tables) {
    await syncSequence(knex, table);
  }
};
