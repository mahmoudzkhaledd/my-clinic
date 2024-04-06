"use server";
import { prisma } from '@/lib/db';
import { authX } from "@/authX";
import { redirect } from 'next/navigation';
import ClinicCard from './_components/ClinicCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import Image from 'next/image';

export default async function AllClinics() {
  const session = await authX();
  if (!session?.user?.id) redirect('/');

  const clinics = await prisma.clinic.findMany({
    where: {
      OR: [
        {
          userId: session.user.id,
        },
        {
          employees: {
            some: {
              userId: session.user.id,
            },
          }
        }
      ],
    }
  });

  return (
    <div className='w-full flex flex-col h-full'>
      <div className='mb-4 flex items-center justify-between flex-wrap'>
        <Heading
          title='Clinics'
          description=""
          className=' max-w-[1000px]'
        />
        <Link href={'./clinics/create'} >
          <Button className='flex items-center gap-1' size={'sm'}><Plus /> <p>New clinic</p> </Button>
        </Link>
      </div>
      <hr />
      {
        clinics.length === 0 &&
        <div className='m-auto flex flex-col  items-center justify-center mt-[200px]'>
          <Image
            className='w-[120px] mb-4'
            src={'/images/project.png'} alt='' width={300} height={300} />
          <h2 className=' font-bold text-lg'>Add your first clinic</h2>
          <Link className='mt-2 w-full' href={'./clinics/create'}>
            <Button className='w-full' size={'sm'}>
              Get started
            </Button>
          </Link>
        </div>
      }
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-3'>
        {
          clinics.map((e, idx) => <ClinicCard clinic={e} key={idx} />)
        }
      </div>
    </div>
  )
}
