import { z } from "zod";

export const amountSchema = z.object({
    amount: z.number().min(50, "The minimum number to charge is 50 EGP")
        .max(100000, "The max number to charge is 50000")
})
