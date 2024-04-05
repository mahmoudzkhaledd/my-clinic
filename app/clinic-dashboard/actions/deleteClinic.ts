"use server";
import { authX } from "@/authX";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
interface ErrorType {
    error: string;
}
export const deleteClinic = async (id: string): Promise<ErrorType | null> => {
    const session = await authX();
    if (!session?.user?.id) return redirect('/');
    const delClini = prisma.clinic.delete({
        where: {
            id: id,
            userId: session.user.id,
        },
    });
    const delEmp = prisma.employee.deleteMany({
        where: {
            clinicId: id,
            doctorId: session.user.id,
        },
    });
    const updateSub = prisma.subscription.update({
        where: {
            userId: session.user.id,

        },
        data: {
            currentClinics: {
                increment: -1,
            }
        }
    })
    try {
        const [cl, emp, dec] = await prisma.$transaction([delEmp, delClini, updateSub]);
        redirect('/dashboard');
    } catch (ex) {
        if ((ex as Error).message == 'NEXT_REDIRECT') {
            throw ex;
        }
        return {
            error: (ex as Error).message,
        }
    }
};