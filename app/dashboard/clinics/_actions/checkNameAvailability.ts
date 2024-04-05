"use server";
import { authX } from "@/authX";
import { customSanatize } from "@/lib/customSantize";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
interface CheckNameResponseType {
    found: boolean;
}
export const checkNameAvailabilityServer = async (name: string): Promise<CheckNameResponseType | null> => {
    const session = await authX();
    if (!session?.user?.id) return redirect('/');
    if (name.length == 0) return {
        found: true,
    };
    name = customSanatize(name);

    const first = await prisma.clinic.findFirst({
        where: {
            slug: name,
        },
    });
    return {
        found: first != null
    }
};