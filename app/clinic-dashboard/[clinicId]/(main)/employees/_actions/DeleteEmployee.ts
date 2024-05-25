'use server';
import { authX } from "@/authX";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
export async function deleteEmployee(employeeId: string): Promise<{ error: string; } | null> {
    const session = await authX();
    const userId = session?.user?.id
    if (!userId || !prisma) redirect('/');

    try {
        const [del, dec] = await prisma.$transaction(async (prsma) => {
            const del = await prsma.employee.delete({
                where: {
                    id: employeeId,
                    doctorId: session.user.id,
                },
            });
            if (!del) {
                throw new Error("Account not found");
            }
            const decrement = await prsma.clinic.update({
                where: {
                    id: del.clinicId,
                    userId: session.user.id,

                },
                data: {
                    employeesCount: {
                        increment: -1,
                    },
                },
            });

            return [del, decrement];
        });
        if (del == null) {
            return {
                error: "Employee not found, please try again",
            };
        }
        redirect(`/clinic-dashboard/${del.clinicId}/employees`);
    } catch (ex) {
        if ((ex as Error).message == "NEXT_REDIRECT") {
            throw ex;
        } else {
            return {
                error: (ex as Error).message,
            }
        }
    }



}