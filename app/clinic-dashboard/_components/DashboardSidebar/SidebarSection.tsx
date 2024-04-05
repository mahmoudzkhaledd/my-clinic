"use client";
import { ClinicDashboardSection, DashboardSection } from '../../../dashboard/types/DashboardSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useParams, usePathname, } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function SidebarSection({ section, divide }: { divide: boolean, section: ClinicDashboardSection }) {
    const param = useParams();

    return (
        <>
            <h2 className="mb-2 text-lg px-4 text-gray-500 tracking-tight">
                {section.title}
            </h2>
            <div className='space-y-2 px-4 mb-2'>
                {
                    section.links.map((e, idx) => {
                        return <Link className='block' key={idx} href={`/clinic-dashboard/${param.clinicId}${section.prefix}${e.link}`}>
                            <Button size={'sm'} className={cn('w-full flex items-center gap-2 justify-start text-start',)} variant={'ghost'}>
                                {e.icon && <e.icon className='w-4 h-4' />}
                                <p className=' capitalize'>{e.title}</p>
                            </Button>
                        </Link>;
                    })
                }
            </div>
            {
                divide && <hr />
            }
        </>
    )
}
