import * as z from 'zod';

export const addEmployeeSchema = z.object({
   
    ssn: z.string().max(50, "Maximum number of 50 characters"),
    fees: z.number(),
    jobTitle: z.string().min(1, "Required field").max(100, "Maximum number of 50 characters"),
    roles: z.array(z.number()),
    
})