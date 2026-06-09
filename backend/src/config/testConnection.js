import db from "./database.js";

try {
  const result = await db.raw("SELECT NOW()");
  console.log("PostgreSQL Connected");
  console.log(result.rows[0]);
} catch (error) {
  console.error("Connection Failed");
  console.error(error);
}
