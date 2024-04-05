import { z } from "zod";

export const accountTypes = z.enum(['user', 'employee']);
export type AccountType = z.infer<typeof accountTypes>;