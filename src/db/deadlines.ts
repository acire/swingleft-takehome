import { z } from "zod";
import { getDB } from "./client";
import { VoterRegistrationDeadlines } from "./types";

export const sortableColumns: Array<keyof VoterRegistrationDeadlines> = ["State", "DeadlineInPerson", "DeadlineByMail", "DeadlineOnline"];

export const DeadlinesQuerySchema = z.object({
  state: z.string().optional(),
  sortBy: z.enum(sortableColumns).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export async function getDeadlines(searchParams?: z.infer<typeof DeadlinesQuerySchema>): Promise<VoterRegistrationDeadlines[]> {
  const db = getDB();
  let query = db.selectFrom("voter_registration_deadlines").selectAll();
  if (searchParams?.state) {
    query = query.where("State", "ilike", `%${searchParams.state}%`); // ilike is case insensitive
  }
  if (searchParams?.sortBy) {
    query = query.orderBy(searchParams.sortBy, searchParams.sortOrder ?? "asc");
  }
  const rows = await query.execute();
  return rows ?? [];
}