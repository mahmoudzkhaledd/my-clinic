"use client";
import { Employee, Role, User } from "@prisma/client";
import { createContext, useContext } from "react"
interface EmpType extends Employee {
    roles: {
        id: number,
        employeeId: string,
        roleId: number,
        role: Role,
    }[],
    user?: User,
}
// @ts-ignore
const ctx = createContext<EmpType>();
export const useEmployee = () => {
    const cont = useContext<EmpType>(ctx);
    return cont;
}
export default function EmployeeProvider({ children, employee }: { children: React.ReactNode, employee: EmpType }) {

    return (
        <ctx.Provider value={employee}>
            {children}
        </ctx.Provider>
    )
}
