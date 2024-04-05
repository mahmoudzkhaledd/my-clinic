'use server';
import { addEmployeeSchema } from "@/app/clinic-dashboard/types/AddEmployeeSchema";
import { authX } from "@/authX";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { redirect } from "next/navigation";
import { z } from "zod";
export async function editEmployee(employeeId: string, values: z.infer<typeof addEmployeeSchema>): Promise<{ error: string; } | null> {
    const session = await authX();
    const userId = session?.user?.id
    if (!userId || prisma == null) redirect('/');
    const model = addEmployeeSchema.safeParse(values);
    if (!model.success) {
        return {
            error: "Please enter all data correctly",
        };
    }

    const del = prisma.employeeRole.deleteMany({
        where: {
            employeeId: employeeId,
        },
    });
    const edit = prisma.employee.update({
        where: {
            id: employeeId,
            doctorId: session.user.id,
        },
        data: {
            fees: model.data.fees,
            ssn: model.data.ssn,
            jobTitle: model.data.jobTitle,
            roles: {
                create: model.data.roles.map(e => { return { roleId: e } }),
            },
        },
    });
    try {
        const [deleted, updated] = await prisma?.$transaction([del, edit]);
        updated.clinicId
        redirect(`/clinic-dashboard/${updated.clinicId}/employees/${updated.id}`);
    } catch (ex) {
        if ((ex as PrismaClientKnownRequestError).code == 'P2002') {
            return {
                error: "This email is already taken, please try another one",
            }
        }
        if ((ex as Error).message == "NEXT_REDIRECT") {
            throw ex;
        }
        return {
            error: (ex as Error).message
        };
    }

}