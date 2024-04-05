import { Button } from '@/components/ui/button';
import { ActivitySquare, HeartPulse, Syringe } from 'lucide-react'
import Link from 'next/link';
import React from 'react';
function CreateItemComponent({ link, icon, title, description, }: {
  link: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className='flex items-center gap-3 justify-between px-6'>
      <div className='w-full py-3 flex gap-4 items-center'>
        <div>
          {icon}
        </div>
        <div className='text-start'>
          <h2 className='font-semibold'>{title}</h2>
          <p className='text-gray-400 text-sm'>{description}</p>
        </div>
      </div>
      <Link href={link}>
        <Button className='h-full' variant={'outline'}>
          Create
        </Button>
      </Link>
    </div>
  )
}

export default function AddClinic() {
  return (
    <div className='w-full  h-full flex flex-col items-center justify-center'>
      <div className='p-5 bg-gray-50 dark:bg-muted max-w-[500px] border rounded-md text-center'>
        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg border mb-3 w-[60px] h-[60px] mx-auto flex'>
          <ActivitySquare className='m-auto' />
        </div>
        <h2 className='font-semibold text-lg'>Create clinic</h2>
        <p className=' text-gray-400'>Create databases and stores that you can connect to your team's projects.</p>
        <div className=' bg-white dark:bg-background border rounded-lg py-2 divide-y mt-4'>
          <CreateItemComponent
            icon={<Syringe />}
            title='Clinic'
            description='Realize your clinic dream with our expert tools.'
            link='./create/clinic'
          />
          <CreateItemComponent
            icon={<HeartPulse />}
            title='Pharmacy'
            description='Craft your pharmacy vision with our expert tools.'
            link='./create/pharmacy'
          />

        </div>
      </div>
    </div>
  )
}
