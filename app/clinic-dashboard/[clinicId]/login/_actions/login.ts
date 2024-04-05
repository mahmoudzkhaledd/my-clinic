'use server';

import { z } from "zod";

import { CredentialsError } from "@/authX/types/CredentialsError";
import { customSanatize } from "@/lib/customSantize";
import { loginSchema } from "@/types/loginSchema";
import { signInClinic } from "@/clinicAuth";



export const loginClinic = async (values: z.infer<typeof loginSchema> & { clinicId?: string; }, clinicId: string) => {
    try {
        values = customSanatize(values);
        await signInClinic(values, `/clinic-dashboard/${clinicId}`, 'employee');
    } catch (ex) {
        if (ex instanceof CredentialsError) {
            return {
                error: ex.message,
            };
        }
        if ((ex as Error).message == 'NEXT_REDIRECT') {
            throw ex;
        }
    }
    return {
        error: "Please check your email or password!",
    };
}