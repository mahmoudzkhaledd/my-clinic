'use server';
import { authX } from "@/authX";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function banEmployee(employeeId: string): Promise<{ error: string; } | null> {
    const session = await authX();
    const userId = session?.user?.id
    if (!userId || prisma == null) redirect('/');
    const emp = await prisma.employee.findUnique({
        where: {
            id: employeeId,
            doctorId: session.user.id,
        },
    });
    if (!emp) {
        return {
            error: "Employees not found, please try again or contact the technical services.",
        };
    }
    const upd = await prisma.employee.update({
        where: {
            id: emp.id,
            doctorId: session.user.id,
        },
        data: {
            banned: !emp.banned,
        }
    });
    return null;
}