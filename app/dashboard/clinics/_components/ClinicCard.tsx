import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Clinic } from '@prisma/client'
import { ArrowRightCircle } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
    // hover:bg-gray-50 dark:hover:bg-muted
    return (
        <Link target='__blank' href={`/clinic-dashboard/${clinic.id}`}>
            <Card className='w-full h-full cursor-pointer   hover:scale-[1.02] group transition-all'>
                <CardHeader className='pb-4'>
                    <div className='flex items-center justify-between '>
                        <h2 className=' text-lg font-semibold capitalize'>{clinic.name}</h2>
                        <ArrowRightCircle className='group-hover:translate-x-1 transition-all w-5 h-5 text-gray-500' />
                    </div>
                </CardHeader>
              
                <hr className='mb-5 border-muted'/>
                <CardContent className=' space-y-2 break-words'>
                    <p className=' text-gray-400 text-sm'>
                        Email: {clinic.contactEmail}
                    </p>

                    <p className=' text-gray-400 text-sm'>
                        Created at: {moment(clinic.createdAt).format('LL')}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}
