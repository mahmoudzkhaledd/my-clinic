'use server';
import { addEmployeeSchema } from "@/app/clinic-dashboard/types/AddEmployeeSchema";
import { authX } from "@/authX";
import { customSanatize } from "@/lib/customSantize";
import { prisma } from "@/lib/db";
import { getUserSubscription } from "@/lib/helper";
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export async function addNewEmployee(values: any, clinicId: string): Promise<{ error: string; } | null> {
    const session = await authX();
    const userId = session?.user?.id
    if (!userId) redirect('/');
    const { subscription, expired, } = await getUserSubscription({ userId, includePackage: true, state: 'accepted', })
    if (!subscription) {
        return {
            error: "You shoud subscripe in package first.",
        }
    }
    if (expired) {
        return {
            error: expired,
        }
    }
    const clinic = await prisma.clinic.findUnique({
        where: {
            userId: userId,
            id: clinicId,
        },
    });
    if (!clinic) {
        return {
            error: "Clinic specified not found!",
        };
    }
    if (clinic.employeesCount >= subscription.package.maxEmployees) {
        return {
            error: "You've reached the maximum number of employees allowd according to the package you're subscriped in.",
        };
    }
    values = customSanatize(values);
    const model = await addEmployeeSchema.safeParse(values);
    if (!model.success) return { error: "Data validation error." };
   
    const createRec = prisma.employee.create({
        data: {
            ...model.data,
            doctorId: userId,
            clinicId: clinic.id,
            roles: {
                create: model.data.roles.map(e => { return { roleId: e } }),
            },
        },
    });
    const updateClinic = prisma.clinic.update({
        where: {
            id: clinic.id,
            userId: userId,
        },
        data: {
            employeesCount: {
                increment: 1,
            },
        },
    });
    try {
        const [emp, update] = await prisma.$transaction([createRec, updateClinic]);
        redirect(`/clinic-dashboard/${clinic.id}/employees/${emp.id}`);

    } catch (ex) {
        if ((ex as PrismaClientKnownRequestError).code == 'P2002') {
            return {
                error: "This email is already taken, please try another one",
            }
        }
        if ((ex as Error).message == 'NEXT_REDIRECT') {
            throw ex;
        }
        return {
            error: (ex as Error).message,
        };
    }
}