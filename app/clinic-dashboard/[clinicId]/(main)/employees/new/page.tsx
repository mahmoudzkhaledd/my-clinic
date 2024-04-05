import React from 'react'
import AddEmployeeForm from './_components/AddEmployeeForm'
import { prisma } from '@/lib/db'
import NotFoundComponent from '@/components/General/NotFoundComponent';
import { EmployeeRole } from '@prisma/client';
export default async function NewEmployeePage({ employeeId }: { employeeId?: string }) {
  const roles = await prisma.role.findMany();
  let emp = null;
  if (employeeId) {
    emp = JSON.parse(JSON.stringify(await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        roles: true,
      },
    })));

    if (emp?.password) {
      emp.password = "";
    }
    if (emp) {
      emp.roles = (emp?.roles as Array<EmployeeRole>).map(e => e.roleId);
    }
  }
  if (employeeId != null && emp == null) {
    return <NotFoundComponent title='Employee not found' subTitle="Please verify the employee's ID, or reach out to technical support for assistance." />
  }
  return (
    <AddEmployeeForm initialData={emp} roles={JSON.parse(JSON.stringify(roles))} />
  )
}
