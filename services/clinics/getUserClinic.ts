"use server";
import { prisma } from "@/lib/db";
import { Clinic, User } from "@prisma/client";
export const getUserClinicByIdOrSlug = async ({ clinicId,  }: { clinicId: string;  }): Promise<Clinic  | null> => {
    return await prisma.clinic.findFirst({

        where: {
            OR: [
                {
                    id: clinicId,
                },
                {
                    slug: clinicId,
                }
            ],
        },
    });
}
