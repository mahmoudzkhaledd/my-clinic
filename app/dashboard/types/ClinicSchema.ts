import * as z from "zod";

export const clinicSchema = z.object({
    name: z.string().min(1, "This field is required").max(100, "Max allowed name is 100 characters"),
    slug: z.string().min(1, "This field is required").max(100, "Max allowed name is 100 characters"),
    contactEmail: z.string().email({message: "Please enter a valid email!"}).min(0).max(100, "Max allowed name is 100 characters"),
});

