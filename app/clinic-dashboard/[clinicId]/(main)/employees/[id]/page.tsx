import React from 'react'
import { prisma } from '@/lib/db';
import NotFoundComponent from '@/components/General/NotFoundComponent';
import AccountInformation from './_components/AccountInformation';
import PersonalInformation from './_components/PersonalInformation';
import ActivitiesCardsRow from './_components/ActivitiesCardsRow';
import InfoTabs from './_components/InfoTabs';
import EmployeeProvider from './_providers/EmployeeProvider';
export default async function EmployeePage({ params }: { params: { id: string; } }) {
  const emp = await prisma.employee.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
      roles: {
        include: {
          role: true,
        }
      },
    },
  });

  if (!emp) {
    return <NotFoundComponent
      title='Employee not found'
      subTitle="Please verify the employee's ID, or reach out to technical support for assistance."
      image='/images/not-found.svg'
    />
  }

  // return (
  //   <div>

  //   </div>
  // );
  return (
    <EmployeeProvider employee={JSON.parse(JSON.stringify(emp))}>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-5'>
        <div className=' col-span-2 space-y-5'>
          <AccountInformation />
          <PersonalInformation />
        </div>
        <div className=' gap-5 grid grid-rows-5 w-full col-span-3'>
          <ActivitiesCardsRow className='w-full row-span-1' />
          <InfoTabs className='w-full row-span-4' />
        </div>
      </div>
    </EmployeeProvider>
  )
}
