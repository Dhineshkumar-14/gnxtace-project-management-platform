import bcrypt from "bcryptjs";

export async function seed(knex) {
  await knex("users").del();

  const adminPasswordHash = await bcrypt.hash("Admin@123", 12);
  const passwordHash = await bcrypt.hash("User@1234", 12);
  await knex("users").insert([
    {
      id: 1,
      email: "admin@example.com",
      password_hash: adminPasswordHash,
      first_name: "System",
      last_name: "Administrator",
      is_active: true,
    },
    {
      id: 2,
      email: "manager@example.com",
      password_hash: passwordHash,
      first_name: "Project",
      last_name: "Manager",
      is_active: true,
    },
    {
      id: 3,
      email: "member@example.com",
      password_hash: passwordHash,
      first_name: "Team",
      last_name: "Member",
      is_active: true,
    },
    {
      id: 4,
      email: "viewer@example.com",
      password_hash: passwordHash,
      first_name: "Report",
      last_name: "Viewer",
      is_active: true,
    },
  ]);
}
