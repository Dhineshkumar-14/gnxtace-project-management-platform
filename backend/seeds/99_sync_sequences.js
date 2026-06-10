import { syncAllSequences } from "./utils/syncSequences.js";

export async function seed(knex) {
  await syncAllSequences(knex);
}
