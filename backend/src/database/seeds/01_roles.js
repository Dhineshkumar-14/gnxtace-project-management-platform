export async function seed(knex) {
  await knex("roles").del();

  await knex("roles").insert([
    {
      id: 1,
      name: "admin",
    },
    {
      id: 2,
      name: "manager",
    },
    {
      id: 3,
      name: "member",
    },
    {
      id: 4,
      name: "viewer",
    },
  ]);
}
