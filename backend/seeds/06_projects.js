export async function seed(knex) {
  await knex("projects").del();

  await knex("projects").insert([
    {
      id: 1,
      owner_id: 1,
      name: "CRM System Development",
      description:
        "Develop a customer relationship management platform for sales and support teams.",
      status: "active",
      start_date: "2026-06-01",
      due_date: "2026-09-30",
    },
    {
      id: 2,
      owner_id: 2,
      name: "E-Commerce Platform Upgrade",
      description:
        "Upgrade the existing e-commerce platform with improved performance and security.",
      status: "on_hold",
      start_date: "2026-05-15",
      due_date: "2026-08-31",
    },
    {
      id: 3,
      owner_id: 2,
      name: "Employee Management Portal",
      description:
        "Internal portal for employee onboarding, attendance, and performance tracking.",
      status: "completed",
      start_date: "2026-01-10",
      due_date: "2026-04-30",
    },
    {
      id: 4,
      owner_id: 1,
      name: "Mobile Banking Application",
      description:
        "Cross-platform banking application for Android and iOS users.",
      status: "active",
      start_date: "2026-06-15",
      due_date: "2026-12-31",
    },
    {
      id: 5,
      owner_id: 3,
      name: "Inventory Management System",
      description:
        "Warehouse and stock management solution for retail operations.",
      status: "active",
      start_date: "2026-07-01",
      due_date: "2026-10-31",
    },
  ]);
}
