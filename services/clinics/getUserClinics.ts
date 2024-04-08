"use server";
import { prisma } from "@/lib/db";
import { Clinic } from "@prisma/client";
export const getUserClinics = async ({ userId }: { userId: string; }): Promise<Clinic[]> => {
    return await prisma.clinic.findMany({
        where: {
            OR: [
                {
                    userId: userId,
                },
                {
                    employees: {
                        some: {
                            userId: userId,
                        },
                    }
                }
            ],
        }
    });
}
