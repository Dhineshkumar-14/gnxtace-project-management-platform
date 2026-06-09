export async function seed(knex) {
  await knex("role_permissions").del();

  await knex("role_permissions").insert([
    // ADMIN
    { role_id: 1, permission_id: 1 },
    { role_id: 1, permission_id: 2 },
    { role_id: 1, permission_id: 3 },
    { role_id: 1, permission_id: 4 },
    { role_id: 1, permission_id: 5 },
    { role_id: 1, permission_id: 6 },
    { role_id: 1, permission_id: 7 },
    { role_id: 1, permission_id: 8 },
    { role_id: 1, permission_id: 9 },

    // MANAGER
    { role_id: 2, permission_id: 1 },
    { role_id: 2, permission_id: 2 },
    { role_id: 2, permission_id: 3 },
    { role_id: 2, permission_id: 5 },
    { role_id: 2, permission_id: 6 },
    { role_id: 2, permission_id: 7 },
    { role_id: 2, permission_id: 9 },

    // MEMBER
    { role_id: 3, permission_id: 2 },
    { role_id: 3, permission_id: 5 },
    { role_id: 3, permission_id: 6 },

    // VIEWER
    { role_id: 4, permission_id: 2 },
  ]);
}
