"use server";
import { prisma } from "@/lib/db";
import { Clinic } from "@prisma/client";
export const authorizeUserClinic = async ({ clinic, userId }: { clinic: Clinic; userId: string; }): Promise<boolean> => {
    if (clinic.userId == userId) return true;
    const emp = await prisma.employee.findFirst({
        where: {
            clinicId: clinic.id,
            userId: userId,
        },
    });
    return emp != null;
}
