'use server';
import { authX } from "@/authX";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function acceptRefuseInvition(employeeId: string, accept: boolean): Promise<{ error: string; } | null> {
    const session = await authX();

    if (!session?.user?.id || prisma == null) redirect('/');
    try {
        const invitation = await prisma.$transaction(async (prsma) => {
            const inv = await prsma.employee.findUnique({ where: { id: employeeId }, });
            if (inv == null) throw new Error("This invitation could not be found!");
            if (inv.status != null) throw new Error('This invitation has already been used!');
            if (inv.doctorId == session.user.id)
                throw new Error("Your account is already part of the team. Please, log in into your account.");
            const user = await prsma.employee.findFirst({
                where: {
                    userId: session.user.id,
                    clinicId: inv.clinicId,
                },
            });
            if (user != null) throw new Error('Your account is already part of the team. Please, log in into your account.');
            const upd = await prsma.employee.update({
                where: {
                    id: employeeId,
                },
                data: {
                    status: accept,
                    user: {
                        connect: { id: session.user.id, },
                    },
                },
            });
            return upd;
        });
        if (accept)
            redirect(`/clinic-dashboard/${invitation.clinicId}`);
        else
            redirect(`/`);
    } catch (ex) {
        if ((ex as Error).message == 'NEXT_REDIRECT') {
            throw ex;
        }
        return {
            error: (ex as Error).message,
        };
    }

}