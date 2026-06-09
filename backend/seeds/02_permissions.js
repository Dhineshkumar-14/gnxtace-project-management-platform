export async function seed(knex) {
  await knex("permissions").del();

  await knex("permissions").insert([
    {
      id: 1,
      name: "projects:create",
      resource: "projects",
      action: "create",
    },
    {
      id: 2,
      name: "projects:read",
      resource: "projects",
      action: "read",
    },
    {
      id: 3,
      name: "projects:update",
      resource: "projects",
      action: "update",
    },
    {
      id: 4,
      name: "projects:delete",
      resource: "projects",
      action: "delete",
    },
    {
      id: 5,
      name: "tasks:create",
      resource: "tasks",
      action: "create",
    },
    {
      id: 6,
      name: "tasks:update",
      resource: "tasks",
      action: "update",
    },
    {
      id: 7,
      name: "tasks:delete",
      resource: "tasks",
      action: "delete",
    },
    {
      id: 8,
      name: "users:manage",
      resource: "users",
      action: "manage",
    },
    {
      id: 9,
      name: "reports:view",
      resource: "reports",
      action: "view",
    },
  ]);
}
