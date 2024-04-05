import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { Plus } from "lucide-react";
import { employeesColumns } from "./_components/EmployeeColumns";
import Link from "next/link";
import HeadingClient from "./new/_components/HeadingClient";
import { authX } from "@/authX";
import CustomTable from "@/components/ui/CustomTable";

export default async function EmployeesPage({ params }: { params: { clinicId: string; } }) {
  const session = await authX();

  const employees = await prisma.employee.findMany({
    where: {
      doctorId: session?.user?.id,
      clinicId: params.clinicId,
    },
  });

  return (
    <div>
      <div className="flex mb-5 justify-between gap-4 items-center flex-wrap">
        <HeadingClient />
        <Link href={`employees/new`}>
          <Button size={'sm'} className="flex items-center gap-1">
            <Plus />
            <p>New employee</p>
          </Button>
        </Link>
      </div>
      <CustomTable columns={employeesColumns} data={employees} />
    </div>
  );
}
